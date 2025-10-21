<h1 align="center">🧘‍♀️ SoulSpace – AI-Powered Mental Health Platform</h1>

<p align="center">
  <strong>SoulSpace</strong> is an AI-driven mental health application designed to help users understand and manage their emotions through face detection, journaling analysis, guided meditation videos, and AI-generated insights.
</p>

---

<h2>🌟 Features</h2>

<ul>
  <li>🔐 <b>Authentication</b> — Secure login and registration using JWT</li>
  <li>📷 <b>Face Detection</b> — Recognize user mood through facial expression analysis</li>
  <li>🧠 <b>AI Journal Analysis</b> — Detect emotions and sentiment from user journals</li>
  <li>🎥 <b>Meditation Videos</b> — Watch or receive recommended videos after mood detection</li>
  <li>📊 <b>Statistics & Insights</b> — Track emotional history and AI-generated summaries using Groq</li>
  <li>💬 <b>Anonymous Chat Forum</b> — Post, reply, and delete your own messages anonymously</li>
  <li>☁️ <b>S3 File Integration</b> — Store media files securely in S3-compatible storage</li>
</ul>

---

<h2>🧩 Tech Stack</h2>

<table>
  <tr><th>Category</th><th>Technology</th></tr>
  <tr><td><b>Language</b></td><td>JavaScript (Node.js)</td></tr>
  <tr><td><b>Framework</b></td><td>Express.js</td></tr>
  <tr><td><b>Database</b></td><td>PostgreSQL</td></tr>
  <tr><td><b>ORM</b></td><td>Prisma</td></tr>
  <tr><td><b>Auth</b></td><td>JWT (JSON Web Token)</td></tr>
  <tr><td><b>Email Service</b></td><td>Nodemailer</td></tr>
  <tr><td><b>Deployment</b></td><td>Docker on Personal VPS</td></tr>
  <tr><td><b>Storage</b></td><td>S3 Compatible Object Storage</td></tr>
</table>

---

<h2>☁️ Integrations</h2>

<ul>
  <li>🧠 <b>Groq API</b> — AI-based sentiment analysis and motivation summary generator</li>
  <li>🤖 <b>AI Face Detection</b> — Integrated emotion recognition module designed by the Data Research team</li>
  <li>📝 <b>AI Journaling</b> — Journal emotion analyzer powered by the Data Research team<</li>
  <li>☁️ <b>S3 Storage</b> — Secure and scalable object storage for user-uploaded files</li>
  <li>📧 <b>Nodemailer</b> — Email service for secure password reset functionality</li>
  <li>🐳 <b>Docker</b> — Containerized deployment on personal VPS environment</li>
</ul>

---

<h2>⚙️ Project Structure</h2>

<pre>
src/
 ┣ base_classes/
 ┃ ┣ base-error.js
 ┃ ┗ base-route.js
 ┣ config/
 ┣ domains/
 ┃ ┣ auth/
 ┃ ┣ chat/
 ┃ ┣ faceDetection/
 ┃ ┣ journaling/
 ┃ ┣ meditation/
 ┃ ┣ news/
 ┃ ┣ statistic/
 ┃ ┗ video/
 ┣ errors/
 ┣ middlewares/
 ┣ utils/
 ┣ app.js
 ┗ server.js
</pre>

---

<h2>🔐 Environment Variables</h2>

<pre><code>
DATABASE_URL="postgresql://postgres:root@localhost:5432/mental_health_db?schema=public"

EMAIL_USERNAME=
EMAIL_PASSWORD=
JWT_SECRET=
PORT="3002"

S3_END_POINT=
IS3_REGION=
IS3_ACCESS_KEY_ID=
IS3_SECRET_ACCESS_KEY_ID=
IS3_BUCKET_NAME=

FE_URL=
BE_URL="http://localhost:3002"
GROQ_API_KEY=
</code></pre>

---

<h2>🚀 Getting Started</h2>

### Clone the Project

```
git clone https://github.com/Xeron23/soulspace-be.git
cd soulspace-be
```


# Install dependencies

```
npm install
```
### Setup environment

Create a .env file and fill it with your configuration


### Configure Prisma
```
npx prisma generate
npx prisma migrate dev
```

### Start the development server

```
npm run dev
```
