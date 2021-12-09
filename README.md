# oauth-fe

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

Jalankan servernya (oauth-be) 'nodemon start' / 'node index.js'
Jalankan clientnya (oauth-fe) 'npm run serve'
Akses root client (http://localhost:8082), kemudian ketika button "Google Sign In" di klik, client melakukan request ke server
Server melakukan request ke provider oauth (google)
Provider oauth (google) mengirim response berupa page html (choose account google)
Ketika salah satu akun dipilih, google akan mengirimkan data akun tersebut ke server
Server melakukan pengecekan data yang diterima dari google, jika ada di database, server generate jwt, jika tidak ada, server akan insert data akun baru, kemudian baru generate jwt
Jwt dikirim ke client
Client menerima jwt dan jwt di store ke local storage
