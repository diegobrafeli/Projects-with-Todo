import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CheckAuthenticateTokenController } from "./controllers/CheckAuthenticateTokenController";
import { CreateProjectController } from "./controllers/CreateProjectController";
import { CreateTaskController } from "./controllers/CreateTaskController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListProjectController } from "./controllers/ListProjectController";
import { ListTaskController } from "./controllers/ListTaskController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { CheckAuthenticateTokenService } from "./services/CheckAuthenticateTokenService";

const router = Router();

const createUserController = new CreateUserController();
const createProjectController = new CreateProjectController();
const createTaskController = new CreateTaskController();
const listProjectController = new ListProjectController();
const listTaskController = new ListTaskController();
const checkAuthenticateTokenController = new CheckAuthenticateTokenController();

const authenticateUserController = new AuthenticateUserController();

router.post("/login", authenticateUserController.handle);
router.post("/users", ensureAuthenticated, createUserController.handle);
router.get("/check/token/:token_storage", checkAuthenticateTokenController.handle);

router.post("/projects", ensureAuthenticated, createProjectController.handle);
router.get("/projects/list", ensureAuthenticated, listProjectController.handle);

router.post("/tasks", ensureAuthenticated, createTaskController.handle);
router.get("/tasks/list/:pro_id", ensureAuthenticated,  listTaskController.handle);




export { router }