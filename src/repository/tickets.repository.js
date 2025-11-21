import TicketModel from "../dao/models/ticket.model.js";

class TicketRepository {
  static async create(data) {
    return await TicketModel.create(data);
  }

  static async getById(id) {
    return await TicketModel.findById(id);
  }
}

export default TicketRepository;