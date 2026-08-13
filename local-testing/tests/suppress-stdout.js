// Filters the Clarity contract print output that clarinet-sdk-wasm emits via
// console.log. Registered as a vitest setupFile loaded only when
// SUPPRESS_CLARINET_LOGS is set, so it runs before the simnet initializes and
// the noisy prints fire. SHOW_CONTRACT_PRINTS=1 bypasses the filter.

if (!process.env.SHOW_CONTRACT_PRINTS) {
  const origLog = console.log;

  console.log = (...args) => {
    if (args.length === 1 && typeof args[0] === 'string') {
      if (args[0].includes('sbtc-registry:280')) return;
      if (args[0].includes('add-to-allowlist')) return;
      if (args[0].includes('transformMode')) return;
    }
    origLog(...args);
  };
}
