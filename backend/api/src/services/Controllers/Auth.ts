import { ServiceContainer } from "@services/";
import { Request, Response } from "express";
import { BaseController } from "./Base";

/**
 * @class AuthController
 * @extends BaseController
 */
export class AuthController extends BaseController {
  /**
   * @param {ServiceContainer} services
   */
  constructor(services: ServiceContainer) {
    super(services, "auth", [
      {
        action: "loginLocal",
        auth: "NONE",
        url: "/login",
        verb: "get",
      },
    ]);
  }

  /**
   * @param {e.Request} req
   * @param {e.Response} res
   */
  async loginLocal(_req: Request, res: Response) {
    res.status(500).json({ error: "unknown error", status: "ko" });
  }
}
