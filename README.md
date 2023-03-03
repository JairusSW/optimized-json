## Optimized JSON, but unsafe! :D

A take on tuning a custom JSON serializer and parser to be as fast as possible without SIMD.
Tuned for V8 with a few tricks I found along the way.
It will be designed to have the least amount of overhead (allocations primarily plague other implementations) and a minimal amount of computation.