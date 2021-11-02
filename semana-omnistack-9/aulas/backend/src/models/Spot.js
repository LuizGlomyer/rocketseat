const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId, // id do usuário no db
        ref: 'User',
    }
},{ // configuração para o mongoose
    toJSON: { // calcula os virtuals sempre que os dados forem transformados em json
        virtuals: true
    }
});

// virtual adiciona campos que não estão na db à informação retornada
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
});

module.exports = mongoose.model("Spot", SpotSchema);