import SlackAdapter from './slack';

export default SlackAdapter.extend({
  shouldReloadAll() {
    return true;
  }
});
