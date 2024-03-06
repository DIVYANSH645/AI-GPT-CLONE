import { Router } from "express";
import { summaryController, paragraphController,chatbotController ,jsconverterController} from "../controllers/OpenAiController.js";

const router = Router();

//route
router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);

export default router;