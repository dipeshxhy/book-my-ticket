-- Adds ownership fields required by seat booking/unbooking logic.
-- Safe to run multiple times.

ALTER TABLE seats
  ADD COLUMN IF NOT EXISTS name VARCHAR(255);

ALTER TABLE seats
  ADD COLUMN IF NOT EXISTS user_id VARCHAR(255);

-- Ensure existing rows are treated as available if data is incomplete.
UPDATE seats
SET isbooked = 0,
    name = NULL,
    user_id = NULL
WHERE isbooked = 0;
