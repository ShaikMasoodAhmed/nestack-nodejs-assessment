
const usageStore = new Map();

const WINDOW_MS = 60_000;

const RULES = {
  free: {
    ai: 5,
    read: 30,
  },
  paid: {
    ai: 30,
    read: 120,
  },
};

function rateLimiter(endpointType) {
  return function (req, res, next) {
    
    const headerTier = req.get("X-User-Tier");

    const tier =
      headerTier === "paid" || headerTier === "free"
        ? headerTier
        : "free";

    
    const userId = req.get("X-User-ID") || "anonymous";

    
    const limit = RULES[tier][endpointType];

    
    const key = JSON.stringify([
      userId,
      tier,
      endpointType,
    ]);

    const now = Date.now();
    let record = usageStore.get(key);

   
    if (!record || now - record.windowStart >= WINDOW_MS) {
      record = {
        count: 0,
        windowStart: now,
      };

      usageStore.set(key, record);
    }

   
    if (record.count >= limit) {
      const elapsed = now - record.windowStart;

      const retryAfter = Math.max(
        0,
        Math.ceil((WINDOW_MS - elapsed) / 1000)
      );

      return res.status(429).json({
        error: "rate_limit_exceeded",
        limit: limit,
        window_seconds: 60,
        retry_after_seconds: retryAfter,
      });
    }

    
    record.count += 1;

    next();
  };
}

module.exports = rateLimiter;
