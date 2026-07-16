# Hardware, Firmware, and FPGA Validation Plan

## Configuration under test

- Product/board/device revision:
- Firmware/bitstream/software commit:
- Toolchain and versions:
- Build configuration:
- Test equipment and calibration:
- Power supplies and limits:
- Environmental conditions:

## Requirements traceability

| Requirement | Test ID | Method | Instrument/tool | Pass criteria | Result/evidence |
|---|---|---|---|---|---|
| | | Simulation / bench / HIL / field | | | |

## Pre-power checks

- [ ] Schematic, layout, assembly, and errata reviewed.
- [ ] Rails checked for shorts and expected resistance.
- [ ] Current limits configured.
- [ ] Clock, reset, boot straps, and programming path verified.
- [ ] Thermal and safety precautions in place.

## Bring-up order

1. Verify rails, sequencing, current, and temperature.
2. Verify clock and reset.
3. Verify programming/debug connection.
4. Load minimal known-safe image.
5. Verify basic communications and register access.
6. Exercise one subsystem at a time.
7. Capture golden traces and measurements.

## Verification matrix

- [ ] Unit/host simulation.
- [ ] RTL lint and assertions.
- [ ] CDC/RDC and timing analysis.
- [ ] Synthesis/place-and-route warnings reviewed.
- [ ] Firmware static analysis and unit tests.
- [ ] Interface protocol and error injection.
- [ ] Hardware-in-loop.
- [ ] Power, thermal, performance, and stress.
- [ ] Brownout, reset, timeout, disconnect, and corrupted-input recovery.
- [ ] Update, rollback, and recovery mode.

## Failure record

| Timestamp | Stimulus | Expected | Actual | Layer | Trace/measurement | Hypothesis |
|---|---|---|---|---|---|---|
| | | | | App/driver/FW/RTL/board | | |

## Release decision

- Unresolved warnings:
- Known limitations:
- Safety/security review:
- Pilot scope:
- Monitoring:
- Rollback/recovery:
- Approver:

