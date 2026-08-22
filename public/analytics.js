/* Basic, anonymous site-traffic analytics. Click tracking and replay are disabled. */
(function (document, posthog) {
  if (posthog.__SV) return;

  window.posthog = posthog;
  posthog._i = [];
  posthog.init = function (token, config, name) {
    function queue(target, method) {
      target[method] = function () {
        target.push([method].concat(Array.prototype.slice.call(arguments)));
      };
    }

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.crossOrigin = "anonymous";
    script.async = true;
    script.src =
      config.api_host.replace(".i.posthog.com", "-assets.i.posthog.com") +
      "/static/array.js";
    var firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode.insertBefore(script, firstScript);

    var client = posthog;
    if (name !== undefined) {
      client = posthog[name] = [];
    } else {
      name = "posthog";
    }

    client.people = client.people || [];
    client.toString = function (asPeople) {
      var label = name === "posthog" ? "posthog" : "posthog." + name;
      return asPeople ? label + ".people (stub)" : label + " (stub)";
    };
    client.people.toString = function () {
      return client.toString(true);
    };

    var methods =
      "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(
        " ",
      );
    for (var index = 0; index < methods.length; index += 1) {
      queue(client, methods[index]);
    }

    posthog._i.push([token, config, name]);
  };
  posthog.__SV = 1;
})(document, window.posthog || []);

window.posthog.init("phc_ve7aSVDEMoomaJ8Mrw7mbkquN7MwEeDHUdwSrsT2PnsV", {
  api_host: "https://us.i.posthog.com",
  defaults: "2026-05-30",
  autocapture: false,
  capture_pageview: true,
  capture_pageleave: true,
  disable_session_recording: true,
});
