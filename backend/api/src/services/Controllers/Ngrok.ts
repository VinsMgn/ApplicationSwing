import { ServiceContainer } from "@services/";
import { Request, Response } from "express";
import { BaseController } from "./Base";

/**
 * @class Ngrok
 * @extends BaseController
 */
export class NgrokController extends BaseController {
  /**
   * @param {ServiceContainer} services
   */
  constructor(services: ServiceContainer) {
    super(services, "ngrok", [
      {
        action: "getContent",
        auth: "NONE",
        url: "/",
        verb: "post",
      },
    ]);
  }

  /**
   * @param {e.Request} req
   * @param {e.Response} res
   */
  async getContent(req: Request, res: Response) {
    console.log(req.body);
    res.status(200).json(req.body);
  }
}
