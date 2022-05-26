import { Testimonials } from "../models/Testimonials.js";
import { Trip } from "../models/Trip.js";


const homePage = async (req, res) => { //res lo que enviamos nosotros, y req es lo que express nos responnde
    
    //we have to create an empty list to add both querys
    const promiseDB = [];

    //consult 3 trips from the model trip
    promiseDB.push(Trip.findAll( {limit: 3} )) 

    //consult database testimonials
    promiseDB.push(Testimonials.findAll( {limit: 3} ))
    
    try {
        //we have to use a promise to execute both querys at the same time, to avoid wait.
        const promiseResult = await Promise.all(promiseDB);
    
        res.render("home", {
            page: "Home",
            homeClass: "home",
            trips: promiseResult[0],
            testimonials: promiseResult[1]
        });

    } catch (error) {
        console.log(error)
    }
}

const aboutPage = (req, res) => { 
    res.render("about", {
        page: "About"
    });
}

const testimonialsPage = async (req, res) => { 
    try {
        //consult database testimonials
        const testimonials = await Testimonials.findAll();

        res.render("testimonials", {
            page: "Testimonials",
            testimonials
        });
    } catch (error) {
       console.log(error); 
    }
    
}


const tripsPage = async (req, res) => { 

    try {
        const trips = await Trip.findAll()
    
        res.render("trips", {
            page: "Next Trips",
            trips: trips
        });  
    } catch (error) {
        console.log(error)
    }
    
}

const contactPage = (req, res) => { 
    res.send("contact me");
}


//show a trip for his slug
const tripDetailPage = async (req, res) => {
    const { slug } = req.params;

    try {
        const result = await Trip.findOne( { where : {slug: slug} })
        res.render("trip", {
            page: "Trip Info",
            result: result
        })
    } catch (error) {
        console.log(error)
    }

}


export {
    homePage,
    aboutPage,
    testimonialsPage,
    tripsPage,
    contactPage,
    tripDetailPage,
}