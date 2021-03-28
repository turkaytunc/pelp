export default class StatusError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}
