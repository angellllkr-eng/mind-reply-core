# Controls Specification

Status: SAVED REFERENCE  
Purpose: reusable player-input and movement QA specification for NOVA game experiences.

## Core player-facing law
For chase/behind-camera vehicles and aircraft:
- A / Left Arrow = left
- D / Right Arrow = right
- W = forward
- S = brake/reverse where the game mode supports it

Never reuse FPS strafe semantics for vehicle steering. Vehicle A/D controls yaw/roll rate, not lateral position offset.

If A turns right, flip the steering sign once and retest. If A turns left but barely rotates, treat that as a turn-rate/tuning issue, not an inversion issue.

## Three.js basis
Use the shared basis when building three.js 3D controls:
- Right-handed coordinates
- +Y up
- Meshes face +Z
- Cameras look along local -Z
- yaw=0 faces world -Z
- +yaw is counter-clockwise about +Y
- forward = (-sin(yaw), 0, -cos(yaw))
- right = (cos(yaw), 0, -sin(yaw))

For a chase camera, A increases yaw so the nose moves left; D decreases yaw so the nose moves right.

## Genre mappings
### FPS
- W forward
- S backward
- A left strafe
- D right strafe
- Mouse controls yaw/pitch

### Ground and water vehicles
- A steer = +1
- D steer = -1
- yaw += steer * turnRate * speedFactor * reverse * dt
- Move along the resulting heading

### Fixed-wing aircraft
- A = roll left
- D = roll right
- W/S follow the aircraft's documented pitch/throttle scheme
- Q/E may provide optional yaw

### Helicopter / drone / 6DOF
Use an explicit movement overlay. A remains left and D remains right in the chosen horizontal frame. Throttle must not become sticky.

### 2D side-scroller
- A = left
- D = right

## Input plumbing
- Use event.code, not layout-dependent key labels.
- Clear held keys on blur and visibilitychange.
- Run movement from a game-loop delta time.
- Unify keyboard, touch, and gamepad into semantic actions.
- Touch controls should use comfortable targets of at least 44px.
- Compute forward once and share it with movement and chase-camera logic.

## Mandatory self-test
Before marking a controls implementation done:
1. Hold A and verify left movement/rotation within about 0.5 seconds.
2. Hold D and verify right movement/rotation within about 0.5 seconds.
3. Hold W and verify forward movement/speed.
4. Hold S and verify braking/reverse behavior for the mode.
5. Repeat the A/D test for the relevant aircraft or vehicle mode.
6. Verify the camera agrees with the player's perceived left/right direction.
7. Clear held input and verify the player stops receiving stale key state.

Recommended dev/QA hook:
- window.__controlsTest
- getYaw()
- getSpeed()
- setSteer()
- setKeys()

Automated smoke tests should hold keys through the probe rather than relying on a detached keydown event. Test A and D as mirrored cases and capture a screenshot after the checks.

## Reference implementation guidance
Three.js provides separate control families for first-person, pointer-lock, and fly-style navigation. Choose the control model by genre rather than forcing one controller across all game types. The official examples document WASD movement for pointer-lock and WASD plus aircraft-style controls for fly navigation.

## Finish criteria
A controls feature is ready only when:
- the input mapping is explicit;
- A is demonstrably left and D demonstrably right;
- movement, rotation, and camera agree;
- stale key state is cleared;
- keyboard/touch/gamepad mappings resolve to the same semantic actions where supported;
- the self-test passes;
- the tested result is recorded with the implementation/QA evidence.

This document is a reusable engineering reference. It does not itself claim that a specific game implementation has passed these tests.
