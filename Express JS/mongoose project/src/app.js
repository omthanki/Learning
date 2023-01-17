const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect("mongodb://0.0.0.0:27017/mydb",{ useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("connection successful"))
.catch((err) => console.log(err))

const playlistSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    ctype: String,
    videos: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now()
    }
})

const Playlist = new mongoose.model("Playlist", playlistSchema);

const createDocument = async() => {

    try{

    const reactPlaylist = new Playlist({
        name: "React",
        ctype: "Front end",
        videos: 80,
        author: "Thapa Technical",
        active: true
    })

    await reactPlaylist.save();

    }
    catch(err){
        console.log(err)
    }
}

createDocument();
