import { Testimonials } from "../models/Testimonials.js";



 const saveTestimonials = async (req, res) => { 
    
    const {name, message, email} = req.body;

    const errors = [];

    if(name.trim() === "") {
        errors.push({errorMessage: "The name is empty"});
    }

    if(message.trim() === "") {
        errors.push({errorMessage: "The message is empty"});
    }

    if(email.trim() === "") {
        errors.push({errorMessage: "The email is empty"});
    }
   
    if(errors.length > 0) {

        //consult database testimonials
        const testimonials = await Testimonials.findAll();

        res.render("testimonials", {
            page: "Testimonials",
            errors,
            message,//we pass this variables to keep what the people had written
            name,
            email,
            testimonials
        })
    } else {
        //here we storage the info to the database
        try {
            await Testimonials.create({
                name,
                email,
                message
            })
            res.redirect("/testimonials")
        } catch (error) {
            console.log(error)
        }
    }
}

export default saveTestimonials