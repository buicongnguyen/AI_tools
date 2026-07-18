// Reference solution: concurrent callers share one session-scoped refresh.
export class AuthClient {
  constructor(server, logger = () => {}) {
    this.server = server;
    this.logger = logger;
    this.accessToken = "expired";
    this.refreshToken = "refresh-0";
    this.logoutCount = 0;
    this.refreshInFlight = null;
  }

  async request(resource) {
    if (this.accessToken === "expired") await this.ensureFreshSession();
    return { resource, authorization: `Bearer ${this.accessToken}` };
  }

  async ensureFreshSession() {
    if (!this.refreshInFlight) {
      this.refreshInFlight = this.server.refresh(this.refreshToken)
        .then((tokens) => {
          this.accessToken = tokens.accessToken;
          this.refreshToken = tokens.refreshToken;
        })
        .catch((error) => {
          this.logoutCount += 1;
          this.logger("Refresh failed; session cleared");
          throw error;
        })
        .finally(() => {
          this.refreshInFlight = null;
        });
    }

    return this.refreshInFlight;
  }
}
