import BaseError from "../../../base_classes/base-error.js";
import prisma from "../../../config/db.js";

class MeditateQueue {

  async create(data) {
    // data (userId, meditationId)
    const checkMeditaion = await prisma.meditation.findFirst({
        where: {
            meditation_id: data.meditationId
        }
    })
    if(!checkMeditaion){
        throw BaseError.notFound("Meditaion not found");
    }
    const totalQueue = await prisma.meditationQueue.count({
      where: { userId: data.userId }
    });

    const position = totalQueue + 1;

    const status = totalQueue === 0 ? 'playing' : 'queued';

    const queue = await prisma.meditationQueue.create({
      data: {
        ...data,
        position,
        status
      }
    });

    return queue;
  }

  async getAll(userId) {
    const queue = await prisma.meditationQueue.findMany({
      where: { userId },
      orderBy: { position: 'asc' },
      include: { meditation: true }
    });

    if (!queue || queue.length === 0) {
      throw BaseError.notFound('Queue not found');
    }

    return queue;
  }

    async reset(userId) {
    await prisma.$transaction(async (tx) => {
        await tx.meditationQueue.updateMany({
        where: { userId },
        data: { status: 'queued' }
        });

        await tx.meditationQueue.updateMany({
        where: { userId, position: 1 },
        data: { status: 'playing' }
        });
    });

    return { message: 'Successfully reset queue' };
    }

  async deleteQueueById(userId, queueId) {
    await prisma.$transaction(async (tx) => {
      const target = await tx.meditationQueue.findUnique({
        where: { id: queueId }
      });

      if (!target || target.userId !== userId) {
        throw BaseError.notFound('Queue not found');
      }

      await tx.meditationQueue.delete({ where: { id: queueId } });

      await tx.meditationQueue.updateMany({
        where: {
          userId,
          position: { gt: target.position }
        },
        data: {
          position: { decrement: 1 }
        }
      });
    });

    return { message: 'Successfully deleted queue' };
  }

  async next(userId) {
    await prisma.$transaction(async (tx) => {
      const current = await tx.meditationQueue.findFirst({
        where: { userId, status: 'playing' }
      });

      if (!current) throw BaseError.notFound('No currently playing queue');

      await tx.meditationQueue.update({
        where: { id: current.id },
        data: { status: 'played' }
      });

      const next = await tx.meditationQueue.findFirst({
        where: {
          userId,
          position: current.position + 1
        }
      });

      if (next) {
        await tx.meditationQueue.update({
          where: { id: next.id },
          data: { status: 'playing' }
        });
      }
    });

    return { message: 'Moved to next queue' };
  }

  async prev(userId) {
    await prisma.$transaction(async (tx) => {
      const current = await tx.meditationQueue.findFirst({
        where: { userId, status: 'playing' }
      });

      if (!current) throw BaseError.notFound('No currently playing queue');

      await tx.meditationQueue.update({
        where: { id: current.id },
        data: { status: 'queued' }
      });

      const prev = await tx.meditationQueue.findFirst({
        where: {
          userId,
          position: current.position - 1
        }
      });

      if (prev) {
        await tx.meditationQueue.update({
          where: { id: prev.id },
          data: { status: 'playing' }
        });
      }
    });

    return { message: 'Moved to previous queue' };
  }

    async reorder(userId, newOrder) {
    await prisma.$transaction(async (tx) => {
        for (const item of newOrder) {
        await tx.meditationQueue.updateMany({
            where: {
            id: item.id,
            userId: userId,
            },
            data: {
            position: item.position,
            },
        });
        }
    });

    return { message: 'Successfully reordered queue' };
    }
}

export default new MeditateQueue();