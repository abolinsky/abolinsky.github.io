+++
title = "AI is the New Compiler"
date = 2026-01-30
+++

In 1957, IBM introduced the first mainstream compiler for the FORTRAN language and revolutionized software development. It allowed programmers to work at a higher level of abstraction, shifting from writing the individual instructions that the computer would execute to more human-readable expressions of intent. Similarly, modern AI tools like GitHub Copilot and Claude Code enable developers to describe their intent in completely natural language, further abstracting developers away from the syntax of a programming language and low-level coding details.

To illustrate, consider implementing a chess engine.

Before compilers, programmers hand-wrote assembly code directly manipulating hardware registers and memory, as in this illustrative example of code written for the IBM 704, the computer for which FORTRAN was developed.

```
       LXD B2,1
       LXD B3,2
RDBCD  CPY L
       TXL B1
       TRA 2,4
B1     STQ LS
       SXD B2,1
       SXD B3,2
       LXD B4,1
       CPY R
       STQ RS
       TSX C1,2
B2     TXL B5
       ALS 1
B3     TXL C2
B5     CPY 8L
       STQ LS
       CPY 8R
       STQ RS
       TSX C1,2
B4     TXL B6,0,8
       ALS 3
       TXL C3
B6     CAL L
       SLW LS
       CAL R
```

This required deep knowledge of the 704's 36-bit architecture, index registers, and manual optimization for vacuum-tube speed. It also required a lot of patience, as even smaller programs took many lines of instructions!

With the advent of compilers like FORTRAN, programmers could express logic more naturally and move away from hardware intricacies:

```
      SUBROUTINE MAKEMOVE(BOARD, FROM, TO, CAPTURED)
      INTEGER BOARD(8,8), FROM, TO, CAPTURED
      INTEGER RF, CF, RT, CT, PIECE
      RF = FROM / 8 + 1
      CF = MOD(FROM, 8) + 1
      RT = TO / 8 + 1
      CT = MOD(TO, 8) + 1
      CAPTURED = BOARD(RT, CT)
      PIECE = BOARD(RF, CF)
      BOARD(RT, CT) = PIECE
      BOARD(RF, CF) = 0
      IF (IABS(PIECE) .EQ. PAWN .AND. (RT .EQ. 1 .OR. RT .EQ. 8)) THEN
        BOARD(RT, CT) = ISIGN(QUEEN, PIECE)
      END IF
      RETURN
      END

      SUBROUTINE UNMAKEMOVE(BOARD, FROM, TO, CAPTURED)
      INTEGER BOARD(8,8), FROM, TO, CAPTURED
      INTEGER RF, CF, RT, CT
      RF = FROM / 8 + 1
      CF = MOD(FROM, 8) + 1
      RT = TO / 8 + 1
      CT = MOD(TO, 8) + 1
      BOARD(RF, CF) = BOARD(RT, CT)
      BOARD(RT, CT) = CAPTURED
      RETURN
      END
```

The specifics of the computer are gone. Eventually the compiler could target a variety of hardware and hide those details from the developer.

With AI, the "code" is a natural language prompt:

"Write a complete chess engine in Python that can play against a human via console input, implementing minimax with alpha-beta pruning to depth 4, evaluating based on material, mobility, and king safety, with a standard 8x8 board representation and full rule enforcement including castling, en passant, and checkmate detection."

Both the compiler and AI act as black boxes: compilers transform high-level code into machine instructions through some complex process of optimization passes, while AI models transform prompts into working programs through some complex process of neural network parameter tuning and inference. In both, the complexities are hidden under the hood. Just as the compiler allowed one to write a program in FORTRAN once that could be executed on a variety of hardware, AI is allowing one to write a prompt once, and with just a single word change generate a program in a variety of programming languages.

![Replace "COMPILING" with "GENERATING"](https://imgs.xkcd.com/comics/compiling.png)

(Replace "COMPILING" with "GENERATING")

This abstraction sparked fears back then that compilers would replace skilled programmers and not perform as well[1](https://www.ibm.com/history/fortran#:~:text=Fortran%20confounded%20skeptics%20who%20insisted,translated%20Fortran%E2%80%99s%20programs%20into%20the%C2%A0IBM%C2%A0704%E2%80%99s), much like today's concerns about AI doing the same. Yet, compilers ultimately boosted productivity enormously, enabling programmers to translate ideas into executable software faster and on a larger scale. Early compilers were simple, often underperforming hand-optimized assembly by talented engineers familiar with the hardware. They had bugs and inefficiencies, but over time, they surpassed human efforts in optimization and reliability. AI follows a similar path: initial tools may not always outperform experts and can introduce errors, but studies show productivity gains of 20-50%[2](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic) in code generation and debugging for many teams. However, for experienced developers on complex tasks, especially for more niche subjects that are under-represented in AI training data, AI can sometimes slow progress by requiring more review and intervention.

At the end of the day, both tools amplify human capability rather than replace it. Compilers didn't end programming; they expanded it. AI does the same, provided developers also cultivate timeless skills in parallel: design thinking, problem-solving, continuous learning, communication, adaptability, analytical thinking, and self-regulation. These skills ensure we wield this new tool effectively so we can make the most of this view atop this new higher level of abstraction.

Just like the compiler before it, AI is democratizing software development, lowering the barrier to entry and enabling more direct expression of human creativity.

