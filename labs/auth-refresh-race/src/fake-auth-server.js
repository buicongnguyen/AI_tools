class Barrier {
  constructor(parties) {
    this.parties = parties;
    this.arrivals = 0;
    this.released = new Promise((resolve) => { this.release = resolve; });
  }

  async wait() {
    this.arrivals += 1;
    if (this.arrivals === this.parties) this.release();
    await this.released;
  }
}

export class FakeAuthServer {
  constructor({ barrierParties = 1, failRefresh = false } = {}) {
    this.currentRefreshToken = "refresh-0";
    this.refreshCalls = 0;
    this.failRefresh = failRefresh;
    this.barrier = new Barrier(barrierParties);
  }

  async refresh(presentedToken) {
    this.refreshCalls += 1;
    const callNumber = this.refreshCalls;
    await this.barrier.wait();

    if (this.failRefresh || presentedToken !== this.currentRefreshToken) {
      const error = new Error("Refresh rejected");
      error.status = 401;
      throw error;
    }

    this.currentRefreshToken = `refresh-${callNumber}`;
    return {
      accessToken: `access-${callNumber}`,
      refreshToken: this.currentRefreshToken
    };
  }
}
