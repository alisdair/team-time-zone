window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    {
      handler: "silence",
      matchMessage: "Passing the dependentKeys after the callback function in Ember.observer is deprecated. Ensure the callback function is the last argument."
    },
    {
      handler: "silence",
      matchMessage: "Ember.keys is deprecated in favor of Object.keys"
    },
    {
      handler: "silence", matchMessage: "`lookup` was called on a Registry. The `initializer` API no longer receives a container, and you should use an `instanceInitializer` to look up objects from the container."
    }
  ]
};
