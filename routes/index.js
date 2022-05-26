import express from "express";
import { aboutPage, contactPage, homePage, testimonialsPage, tripDetailPage, tripsPage } from "../controllers/pageControllers.js";
import saveTestimonials from "../controllers/testimonialController.js";



const router = express.Router();

router.get("/", homePage)

router.get("/about", aboutPage)

router.get("/testimonials", testimonialsPage)
router.post("/testimonials", saveTestimonials)

router.get("/trips", tripsPage)

router.get("/trips/:slug", tripDetailPage)

router.get("/contact", contactPage)

export default router;