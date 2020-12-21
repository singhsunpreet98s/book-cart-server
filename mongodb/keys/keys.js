

if (process.env.NODE_ENV === "production") {
   module.exports = {
      mongoUrl: "mongodb+srv://root:toor@cluster0.5l9xv.mongodb.net/<dbname>?retryWrites=true&w=majority"
   }
}
else {
   module.exports = {
      mongourl: process.env.MONGOURL
   }
}