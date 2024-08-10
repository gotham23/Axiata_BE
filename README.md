# Binar: Express.js Final Project


Repository ini ditujukan untuk pengembangan BE (Backend) dari Umkm Solo


## Run Locally

Clone the project

```bash
  git clone 
```

Go to the project directory


Install dependencies

```bash
  npm install
  
  yarn install
```

Buat Database PostgreSQL dengan nama dan password kalian ganti .env sesuaikan dengan punya kalian
dan jalankan di lokal

Jalankan perintah Sequelize db:create

```bash
  npm run db:create
```

Jalankan perintah Sequelize db:migrate

```bash
  npm run db:migrate
```

Jalankan perintah Sequelize db:seed:all

```bash
  npm run db:seed
```
melakukan 3 perintah diatas sekaligus 
```
 yarn db:refresh
```
Jalankan Program

```bash
  npm run dev
```
