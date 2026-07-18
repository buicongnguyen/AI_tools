// Intentionally broken baseline: every expired request starts its own refresh.
export class AuthClient {
  constructor(server, logger = () => {}) {
    this.server = server;
    this.logger = logger;
    this.accessToken = "expired";
    this.refreshToken = "refresh-0";
    this.logoutCount = 0;
  }

  async request(resource) {
    if (this.accessToken === "expired") {
      try {
        const tokens = await this.server.refresh(this.refreshToken);
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;
      } catch (error) {
        this.logoutCount += 1;
        this.logger("Refresh failed; session cleared");
        throw error;
      }
    }

    return { resource, authorization: `Bearer ${this.accessToken}` };
  }
}
