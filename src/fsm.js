class FSM {

    constructor(config) {
      this.state = config.initial;
      this.states = config.states;
      this.initial = config.initial;
      this.stateHistory = [this.initial];
      this.stateCache = [];
    }

    getState() {
      return this.state;
    }

    changeState(state) {
      if (this.states[state]) {
        this.stateCache = [];
        this.stateHistory.push(state);
        this.state = state;
      } else throw new Error;
    }

    trigger(event) {
      if (this.getStates(event).includes(this.state)) {
        this.stateCache = [];
        this.state = this.states[this.state].transitions[event];
        this.stateHistory.push(this.state);
      } else throw new Error;
    }

    reset() {
      this.state = this.initial;
    }

    getStates(event) {
      let res = [];
      if (event) {
        for(let i in this.states) {
          if (this.states[i].transitions[event]) res.push(i);
        }
      } else {
        for(let i in this.states) res.push(i);
      }
      return res;
    }

    undo() {
      if (this.stateHistory.length === 1) return false;
      else {
        this.stateCache.push(this.stateHistory.pop());
        this.state = this.stateHistory[this.stateHistory.length - 1];
        return true;
      }
    }

    redo() {
      if (this.stateCache.length === 0) return false;
      else {
        this.stateHistory.push(this.stateCache.pop());
        this.state = this.stateHistory[this.stateHistory.length - 1];
        return true;
      }
    }

    clearHistory() {
      this.stateHistory = [this.initial];
    }
}

module.exports = FSM;
