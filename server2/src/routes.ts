import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateProjectController } from "./controllers/CreateProjectController";
import { CreateTaskController } from "./controllers/CreateTaskController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListProjectController } from "./controllers/ListProjectController";
import { ListTaskController } from "./controllers/ListTaskController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createProjectController = new CreateProjectController();
const createTaskController = new CreateTaskController();
const listProjectController = new ListProjectController();
const listTaskController = new ListTaskController();

const authenticateUserController = new AuthenticateUserController();

router.post("/login", authenticateUserController.handle);
router.post("/users", ensureAuthenticated, createUserController.handle);

router.post("/projects", ensureAuthenticated, createProjectController.handle);
router.get("/projects/list", ensureAuthenticated, listProjectController.handle);

router.post("/tasks", ensureAuthenticated, createTaskController.handle);
router.get("/tasks/list/:pro_id",  listTaskController.handle);




export { router }