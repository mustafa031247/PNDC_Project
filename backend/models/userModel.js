const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const userSchema = mongoose.Schema(

    {
        name: {
            type: String,
            required: true

        },
        email: {
            type: String,
            required: true,
            unique: true

        },
        password: {
            type: String,
            required: true

        },
        pic: {
            type: String,
            default: "https://img.icons8.com/ios-filled/50/user.png"

        },
    }
    , {
        timeStamp: true
    }

)
userSchema.methods.matchPassword = async function (enPassword) { //Write method in uSerSchema in which we Comapre our Enter Pass or password that store in our Passward Property
    return await bcrypt.compare(enPassword, this.password);
}
//pre mean before save we check our passward is is not modified skip it go to next()
userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(15); // Salt Generate Hash Basically higher value of para Generate High Hash Method,Prop (Change salt para from 10 to 15) we take salt var name bcz we have an method of genSalt
    this.password = await bcrypt.hash(this.password, salt);  //here we Encrypt our Passward

})
const User = mongoose.model("User", userSchema)

module.exports = User