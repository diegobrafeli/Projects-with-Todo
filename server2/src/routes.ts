import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CheckAuthenticateTokenController } from "./controllers/CheckAuthenticateTokenController";
import { CreateProjectController } from "./controllers/CreateProjectController";
import { CreateTaskController } from "./controllers/CreateTaskController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListProjectController } from "./controllers/ListProjectController";
import { ListTaskController } from "./controllers/ListTaskController";
import { DeleteProjectController } from "./controllers/DeleteProjectController";
import { DeleteTaskController } from "./controllers/DeleteTaskController";
import { DoneTaskController } from "./controllers/DoneTaskController";

import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createProjectController = new CreateProjectController();
const createTaskController = new CreateTaskController();
const listProjectController = new ListProjectController();
const listTaskController = new ListTaskController();
const checkAuthenticateTokenController = new CheckAuthenticateTokenController();
const deleteProjectController = new DeleteProjectController();
const deleteTaskController = new DeleteTaskController();
const doneTaskController = new DoneTaskController();

const authenticateUserController = new AuthenticateUserController();

router.post("/login", authenticateUserController.handle);
router.post("/users", ensureAuthenticated, createUserController.handle);
router.get("/check/token/:token_storage", checkAuthenticateTokenController.handle);

router.post("/projects", ensureAuthenticated, createProjectController.handle);
router.get("/projects/list", ensureAuthenticated, listProjectController.handle);
router.delete("/projects/:pro_id", ensureAuthenticated, deleteProjectController.handle);

router.post("/tasks", ensureAuthenticated, createTaskController.handle);
router.get("/tasks/list/:pro_id", ensureAuthenticated,  listTaskController.handle);
router.delete("/tasks/:tas_id", ensureAuthenticated, deleteTaskController.handle);
router.put("/tasks/:tas_id", ensureAuthenticated, doneTaskController.handle);




export { router }