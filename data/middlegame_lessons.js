// ── Middlegame Study Curriculum ───────────────────────────────────────────────

window.MG_CURRICULUM = [
  { level: 1, label: 'Beginner',     topics: ['piece-activity', 'king-safety', 'center-control', 'trading-pieces'] },
  { level: 2, label: 'Club',         topics: ['weak-squares', 'open-files', 'pawn-structure', 'bishop-vs-knight', 'piece-coordination', 'space-advantage'] },
  { level: 3, label: 'Intermediate', topics: ['prophylaxis', 'pawn-breaks', 'minority-attack', 'blockade', 'good-bad-bishop'] },
  { level: 4, label: 'Advanced',     topics: ['restricting-opponent', 'favorable-endgames', 'pawn-storm', 'two-bishops', 'rook-seventh', 'imbalances', 'iqp-positions', 'opposite-castling'] },
  { level: 5, label: 'Expert',       topics: ['dynamic-vs-static', 'positional-piece-sac', 'exchange-sacrifice', 'simplification', 'two-weaknesses'] },
  { level: 6, label: 'Master',       topics: ['deep-prophylaxis', 'initiative-tempo', 'long-term-sac', 'steering-endgames', 'pawn-imbalances', 'squeeze-zugzwang'] }
];

window.MG_LESSONS = {

  // ── LEVEL 1: BEGINNER ───────────────────────────────────────────────────────

  'piece-activity': {
    id: 'piece-activity', level: 1, title: 'Piece Activity',
    summary: [
      'Active pieces are the engine of middlegame play. A piece is "active" when it controls important squares, participates in threats, or has scope to maneuver freely. A passive piece — stuck behind its own pawns doing nothing — is effectively a handicap even if it hasn\'t been captured.',
      'Every move should be evaluated by asking: does this improve the activity of my pieces? A rook sitting behind your own pawns on a closed file is nearly useless. That same rook placed on an open file, or on the seventh rank attacking enemy pawns, becomes a dominant force.',
      'The concept of piece activity explains why opening gambits work: you sacrifice a pawn to develop quickly and generate immediate pressure. When your opponent\'s pieces are tangled and passive, even a material deficit can be more than compensated by the energy and coordination of your active forces.'
    ],
    examples: [
      {
        fen: 'r3k2r/ppp2ppp/2nb1n2/3pp1B1/4P1b1/2NP1N2/PPP2PPP/R2QKB1R w KQkq - 0 7',
        orientation: 'white',
        caption: 'White\'s pieces are well-developed: Nc3 controls the center, Nf3 is active, Bg5 pins the f6 knight. Black\'s bishop on g4 is also active, but the bishop on c6 is blocked by the d5 pawn. White should continue activating — castle and then look to use the pin on f6.'
      },
      {
        fen: '2r2rk1/pp3ppp/3p4/3Np3/8/8/PPP2PPP/1R3RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s knight on d5 is ideally placed — controlling key central squares. White\'s rooks on b1 and f1 can swing to open files. The knight on d5 is far more active than any piece Black has. Activity isn\'t just about development — it\'s about having pieces on their best squares.'
      }
    ],
    exercises: [
      {
        id: 'mg-pa-01',
        fen: '2r3k1/pp3ppp/3p4/4p3/8/3N4/PPP2PPP/R5K1 w - - 0 1',
        moves: ['d3f4', 'e5f4']
      },
      {
        id: 'mg-pa-02',
        fen: 'r4rk1/pp2bppp/2n1p3/3p4/3P4/4BN2/PP2BPPP/R4RK1 w - - 0 1',
        moves: ['f3d2', 'd5d4']
      },
      {
        id: 'mg-pa-03',
        fen: '2r3k1/pp3ppp/4p3/3pP3/3P4/8/PP3PPP/R1R3K1 w - - 0 1',
        moves: ['c1c7', 'a7a6']
      }
    ]
  },

  'king-safety': {
    id: 'king-safety', level: 1, title: 'King Safety',
    summary: [
      'King safety is the most urgent factor in chess. No long-term positional advantage matters if your king can be mated in five moves. Before launching any attack or executing a plan, the first question must always be: is my king safe?',
      'Castling is the primary tool for securing your king. It tucks the king behind a wall of pawns, connects the rooks, and removes the king from the center where open lines can be dangerous. As a general rule, castle within the first ten moves unless there is a very specific reason not to.',
      'Once castled, avoid creating pawn weaknesses in front of your king. Advancing the f, g, or h pawns in front of a castled king loosens the pawn shelter and can become the target of an attack. Every pawn move around your king should be made only when necessary and with careful calculation of the consequences.'
    ],
    examples: [
      {
        fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2PP1N2/PP3PPP/RNBQ1RK1 w - - 0 7',
        orientation: 'white',
        caption: 'Both sides have castled kingside. The kings are safe behind intact pawn shelters (f2/g2/h2 for White, f7/g7/h7 for Black). With both kings secure, the middlegame battle shifts to piece activity and pawn structure. This is the ideal setup — only now can you focus on long-term plans.'
      },
      {
        fen: 'r1bqk2r/pppp1Bpp/2n2n2/2b1p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4',
        orientation: 'black',
        caption: 'White has played the Fried Liver (Bxf7+). Black\'s king is exposed on f7 — it can\'t castle anymore and is vulnerable on the open f-file. This position shows why king safety matters so much: Black\'s material is fine but the exposed king leads to a dangerous middlegame. Always prioritize king safety over material.'
      }
    ],
    exercises: [
      {
        id: 'mg-ks-01',
        fen: 'r1bqr1k1/ppp2pp1/2n4p/3pP3/5B2/2NQ4/PPP2PPP/R4RK1 w - - 0 1',
        moves: ['d3h7', 'g8h7']
      },
      {
        id: 'mg-ks-02',
        fen: 'r1b1k2r/ppppqppp/2n2n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQkq - 0 5',
        moves: ['e1g1', 'e7e6']
      },
      {
        id: 'mg-ks-03',
        fen: 'r2qkb1r/ppp1pppp/2n2n2/3p1b2/3P1B2/2N1PN2/PPP2PPP/R2QKB1R w KQkq - 0 5',
        moves: ['f1d3', 'f5d3']
      }
    ]
  },

  'center-control': {
    id: 'center-control', level: 1, title: 'Controlling the Center',
    summary: [
      'The four central squares — e4, d4, e5, d5 — are the most valuable real estate on the chessboard. Pieces placed in or near the center control more squares and can reach any part of the board more quickly. A knight on e4 attacks eight squares; the same knight on h1 attacks only two.',
      'Control can be either physical (a pawn or piece actually occupying a central square) or influence (pieces pointing at central squares from a distance). The classic approach is to establish pawns on e4 and d4 to seize space; the hypermodern approach is to control the center from a distance with pieces and then undermine the opponent\'s central pawns.',
      'When your opponent gains central space, you must react — either by challenging the center directly with your own pawns, or by using pieces to exert pressure on the advanced pawns. Allowing your opponent to build an unchallenged pawn center typically leads to a cramped position where your pieces have little room to maneuver.'
    ],
    examples: [
      {
        fen: 'rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3',
        orientation: 'white',
        caption: 'The Advance French: White has pawns on d4 and e5, claiming a large central space advantage. Black\'s plan is to undermine this center with ...c5, attacking d4. White\'s plan is to maintain the center and use the extra space for a kingside attack. The battle for the center defines the whole game.'
      },
      {
        fen: 'rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',
        orientation: 'white',
        caption: 'White plays 1.d4 2.c4 — the Queen\'s Gambit approach. The c4 pawn controls d5 and offers a sacrifice to lure Black\'s d-pawn away from the center. Two center-influencing pawns give White space and flexibility. Black must decide whether to take, decline, or counter with ...e5 or ...c5.'
      }
    ],
    exercises: [
      {
        id: 'mg-cc-01',
        fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 2',
        moves: ['c4d5', 'f6d5']
      },
      {
        id: 'mg-cc-02',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 2',
        moves: ['d2d4', 'e5d4']
      },
      {
        id: 'mg-cc-03',
        fen: 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',
        moves: ['e4e5', 'f6d5']
      }
    ]
  },

  'trading-pieces': {
    id: 'trading-pieces', level: 1, title: 'Trading Pieces',
    summary: [
      'Every piece exchange changes the character of the position. Before making or accepting a trade, ask two questions: who benefits from the simplified position, and which player\'s pieces are better suited to the resulting pawn structure? A trade that looks "equal" materially can be highly favorable positionally.',
      'When you are ahead in material, trades generally help you — every simplification brings you closer to a won endgame. When you are behind in material or have the attack, avoid unnecessary exchanges: your compensation depends on activity, and trading pieces removes that activity.',
      'Pay close attention to WHICH pieces you are trading. Exchanging your passive bishop for your opponent\'s active knight is excellent strategy. Giving up your active bishop for an opponent\'s passive knight is usually a mistake. Always try to trade your weakest piece for your opponent\'s strongest one.'
    ],
    examples: [
      {
        fen: '2r2rk1/pp3ppp/2n1b3/3p4/3P4/2N1B3/PP3PPP/2R2RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Both sides have similar piece configurations. The key question: should White trade on c6 (Nxc6)? If bxc6, Black gets a semi-open b-file but doubled c-pawns. Trading the active Nc3 for the defensive Nc6 only makes sense if the resulting pawn weakness outweighs the loss of your well-placed knight.'
      },
      {
        fen: 'r4rk1/pp1n1ppp/2p1p3/3pP3/3P1B2/2N5/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s Bf4 is active while Black\'s Nd7 is passive (blocked by e6 and c6 pawns). White should NOT trade the bishop for this knight — the bishop is the better piece. Instead, maintain the bishop and look for ways to exploit Black\'s passive knight. Trade your bad pieces, keep your good ones.'
      }
    ],
    exercises: [
      {
        id: 'mg-tp-01',
        fen: '2r2rk1/pp3ppp/2n1b3/3p4/3P4/4BN2/PP3PPP/2R2RK1 w - - 0 1',
        moves: ['c1c6', 'b7c6']
      },
      {
        id: 'mg-tp-02',
        fen: 'r1b2rk1/pp3ppp/2n1pn2/2pp4/3P4/2NBPN2/PP3PPP/R1B2RK1 w - - 0 1',
        moves: ['d3c2', 'c5d4']
      },
      {
        id: 'mg-tp-03',
        fen: '4r1k1/pp3ppp/5n2/3p4/3P4/5N2/PP3PPP/4R1K1 w - - 0 1',
        moves: ['e1e8', 'f6e8']
      }
    ]
  },

  // ── LEVEL 2: CLUB ───────────────────────────────────────────────────────────

  'weak-squares': {
    id: 'weak-squares', level: 2, title: 'Weak Squares & Outposts',
    summary: [
      'A weak square is one that can no longer be defended by pawns and can be permanently occupied by an enemy piece. Squares become weak when the pawns that could defend them are advanced, traded away, or blocked. Once a square is weak, the side whose pieces can occupy it gains a long-term advantage.',
      'An outpost is a weak square in enemy territory that is occupied by a piece — most often a knight. A knight on an outpost cannot be driven away by pawns and exerts strong influence over a wide area. Knights on e5, d5, f5, or their equivalents are often the key pieces in a middlegame.',
      'To create outposts, provoke your opponent into making pawn advances that leave holes in their position. For example, after Black plays ...f6 to chase away a knight, the e6 and g6 squares become permanently weak — they can never be guarded by pawns again. One pawn move can create a lifetime weakness.'
    ],
    examples: [
      {
        fen: 'r2q1rk1/pp2bppp/2n1pn2/2ppN3/3P4/2N1P3/PP2BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s knight on e5 is a classic outpost. Black cannot drive it away with a pawn — the f6 pawn is blocked by the Nf6, and ...f6 would weaken e6 and g6. The knight on e5 controls d3, d7, c4, c6, f3, f7, g4, g6 — dominating the center. This single piece gives White a lasting advantage.'
      },
      {
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 1',
        orientation: 'white',
        caption: 'The Sicilian Dragon structure. Black has played ...g6, creating weak dark squares on f6 and h6 that can never be guarded by pawns. White\'s plan: Be2, 0-0-0, then push h4-h5 to crack open Black\'s kingside using these dark-square weaknesses. The ...g6 pawn move created permanent holes.'
      }
    ],
    exercises: [
      {
        id: 'mg-ws-01',
        fen: 'r2q1rk1/pp2bppp/2n1pn2/2pp4/3PP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['e4e5', 'f6d7']
      },
      {
        id: 'mg-ws-02',
        fen: 'r2qr1k1/pp2bppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 1',
        moves: ['f3e5', 'c6e5']
      },
      {
        id: 'mg-ws-03',
        fen: 'r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P1b1/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1',
        moves: ['c3d5', 'f6d5']
      }
    ]
  },

  'open-files': {
    id: 'open-files', level: 2, title: 'Open Files & Rook Placement',
    summary: [
      'An open file is one with no pawns for either side; a half-open file has pawns for only one side. Rooks belong on open files — it is where they exert the most pressure and control. Placing a rook on a closed file is one of the most common strategic mistakes at club level.',
      'The player who controls an open file gains multiple advantages: the ability to penetrate to the seventh or eighth rank, pressure on enemy pawns that cannot hide, and the option to double rooks for overwhelming control. When there is one open file in the position, both sides race to place a rook there first.',
      'Half-open files are often even more important because they point directly at an enemy pawn. A rook on a half-open file naturally creates long-term pressure. The opponent must either defend the pawn passively or push it forward — both of which create new problems.'
    ],
    examples: [
      {
        fen: 'r3r1k1/pp3ppp/2p2n2/3p4/3P4/2N2N2/PP3PPP/R3R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'The e-file is open — no pawns for either side. Both White\'s Re1 and Black\'s Re8 contest it. Whoever can double rooks (bring the second rook to e1/e8) will gain control. White should play Rad1 (supporting d4) then Re2, preparing to double on the e-file with Re1+Re2.'
      },
      {
        fen: '1r3rk1/p4ppp/1pp5/3p4/3P4/1P3N2/P4PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Black has doubled rooks on the b-file (Rb8 + Rf8 can come to b8). The b-file is half-open for Black (Black has no b-pawn). White\'s b3 pawn is a target. White must decide: defend b3 passively or counter-attack on the c-file (half-open for White after ...cxd or similar). Active counterplay beats passive defense.'
      }
    ],
    exercises: [
      {
        id: 'mg-of-01',
        fen: 'r3r1k1/pp3ppp/2p2n2/3p4/3P4/2N2N2/PP3PPP/R4RK1 w - - 0 1',
        moves: ['f1e1', 'e8e1']
      },
      {
        id: 'mg-of-02',
        fen: '2r3k1/pp3ppp/2p5/3p4/3P4/2P2N2/PP3PPP/R4RK1 w - - 0 1',
        moves: ['f1c1', 'c8c7']
      },
      {
        id: 'mg-of-03',
        fen: 'r4rk1/pp3ppp/2p1pn2/8/3P4/5N2/PP3PPP/R4RK1 w - - 0 1',
        moves: ['a1c1', 'a8c8']
      }
    ]
  },

  'pawn-structure': {
    id: 'pawn-structure', level: 2, title: 'Pawn Structure',
    summary: [
      'Pawns are the skeleton of a chess position. Unlike pieces, they cannot move backward — every pawn move is permanent. This means pawn structure decisions define the long-term character of the position: which squares are weak, where rooks belong, and which endgames are favorable.',
      'Three pawn weaknesses are especially important: isolated pawns (no neighboring pawns to defend them — must be defended by pieces), doubled pawns (two pawns on the same file — reduced mobility and weak squares), and backward pawns (cannot advance safely because the square ahead is controlled — a fixed target).',
      'The key principle is: avoid creating pawn weaknesses unless you gain concrete compensation — activity, an open file, an outpost, or material. Pawn structure and piece activity are always connected: a bad pawn structure is a weakness only if the opponent\'s pieces can exploit it.'
    ],
    examples: [
      {
        fen: 'r3r1k1/pp3ppp/2p5/3P4/3p4/5N2/PP3PPP/R3R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'Black has an isolated d4 pawn. It controls c3 and e3 but cannot be defended by another pawn. White\'s plan: blockade d4 with a knight (Nd2-c4 or Nd2-b3), then attack it with rooks on the d-file. The isolated pawn is a permanent target that ties down Black\'s pieces to its defense.'
      },
      {
        fen: 'r3r1k1/pp3ppp/2pp4/8/3PP3/5N2/PP3PPP/R3R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'Black has doubled c-pawns (c6 and c7... actually c6 and d6). More accurately: Black\'s d6 and c6 pawns create a compact but passive structure. White\'s central duo (d4+e4) gives space. The lesson: pawn structure determines which side of the board to play on and where pieces belong.'
      }
    ],
    exercises: [
      {
        id: 'mg-ps-01',
        fen: 'r3r1k1/pp3ppp/2p5/8/3Pn3/2N2N2/PP3PPP/R3R1K1 w - - 0 1',
        moves: ['c3e4', 'd4d5']
      },
      {
        id: 'mg-ps-02',
        fen: 'r4rk1/pp2pppp/2p2n2/3p4/3P1B2/2P2N2/PP3PPP/R4RK1 w - - 0 1',
        moves: ['f4e5', 'f6e4']
      },
      {
        id: 'mg-ps-03',
        fen: 'r3r1k1/pp2nppp/2pp4/4p3/2P1P3/2N2N2/PP3PPP/R3R1K1 w - - 0 1',
        moves: ['c4c5', 'd6c5']
      }
    ]
  },

  'bishop-vs-knight': {
    id: 'bishop-vs-knight', level: 2, title: 'Bishop vs Knight',
    summary: [
      'Bishops and knights are generally equal in material value, but their effectiveness varies greatly depending on the position. Understanding when one is better than the other is one of the most important positional skills in chess.',
      'Bishops excel in open, spacious positions where they can use their long diagonals. They are especially powerful in endgames with pawns on both sides of the board, where their range allows them to attack on one wing while defending the other. Two bishops together are a formidable weapon — they complement each other, covering both colors.',
      'Knights prefer closed positions with many pawns where their ability to jump over pieces gives them unique access to squares. A knight anchored on a central outpost surrounded by pawns can be stronger than a bishop. The rule of thumb: open position → bishops are better; closed position → knights are better.'
    ],
    examples: [
      {
        fen: '2r3k1/pp3ppp/4pn2/3p4/1b1P4/2N1P3/PP1B1PPP/2R3K1 w - - 0 1',
        orientation: 'white',
        caption: 'Black\'s bishop on b4 is active, attacking the Nc3 and controlling the a3-f8 diagonal. White\'s Bd2 is passive, mostly defending. In this semi-open position, the bishop pair would be strong. White should avoid trading the Nc3 for the Bb4 — instead, try to reposition pieces so the knight finds a better square.'
      },
      {
        fen: 'r4rk1/pp2nppp/2pp4/3Pp3/4P3/2N5/PPP2PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'A closed position — pawns locked on d5/d6 and e4/e5. Black\'s knight on e7 can maneuver to f5 or g6 to attack the fixed pawns. In this structure, knights are excellent because they jump over the pawn chains. A bishop would be limited by the locked center. Knights thrive in closed games.'
      }
    ],
    exercises: [
      {
        id: 'mg-bk-01',
        fen: '2r3k1/pp3ppp/4p3/3pP3/5B2/8/PP3PPP/2R3K1 w - - 0 1',
        moves: ['f4d6', 'a7a6']
      },
      {
        id: 'mg-bk-02',
        fen: 'r4rk1/pp2nppp/3p4/2pPp3/4P3/2N5/PP3PPP/R4RK1 w - - 0 1',
        moves: ['c3b5', 'e7c8']
      },
      {
        id: 'mg-bk-03',
        fen: '2r3k1/pp2bppp/4pn2/3p4/3P4/4BN2/PP3PPP/2R3K1 w - - 0 1',
        moves: ['f3e5', 'f6d7']
      }
    ]
  },

  'piece-coordination': {
    id: 'piece-coordination', level: 2, title: 'Piece Coordination',
    summary: [
      'Individual pieces in chess are strong, but pieces working together as a team are far more powerful than their individual values suggest. Piece coordination means arranging your pieces so they support each other, protect weaknesses, and combine to attack targets no single piece could handle alone.',
      'The most common coordination failure at club level is having all the right pieces but in the wrong places. A rook on a closed file, a bishop blocking a key diagonal, a queen far from the action — they accomplish nothing together. The first step is to give each piece its natural role.',
      'Look for positions where your pieces create threats that reinforce each other. A knight on an outpost is stronger when a rook supports it from behind. A bishop on a long diagonal is most effective when a queen uses the same line. The greatest attacks are built on perfectly coordinated pieces striking from multiple directions.'
    ],
    examples: [
      {
        fen: 'r1b2rk1/pp3ppp/2n1pn2/2Np4/3P4/4P1B1/PP3PPP/R2Q1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s pieces are beautifully coordinated: Nd5 dominates the center (supported by the d4 pawn), Bg3 controls the c7-h2 diagonal and eyes Black\'s kingside, and the queen on d1 is ready to join the attack via d2 or b3. Every piece has a clear job and they reinforce each other\'s threats.'
      },
      {
        fen: 'r4rk1/pp2ppbp/2np1np1/q7/2P1P3/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Both sides have fianchettoed bishops. White\'s Bg2 works with the Nc3 to control d5, while Black\'s Bg7 and Qa5 create pressure on the queenside. Good coordination means each piece amplifies the others — the Bg2 defends d5 while the Nc3 attacks it, doubling the control.'
      }
    ],
    exercises: [
      {
        id: 'mg-pc-01',
        fen: 'r3r1k1/pp3ppp/2n2n2/3p4/3P4/4PN2/PP2BPPP/R3R1K1 w - - 0 1',
        moves: ['e2d3', 'f6e4']
      },
      {
        id: 'mg-pc-02',
        fen: 'r1b2rk1/pp3ppp/2n1pn2/3p4/3P4/2NBPN2/PP3PPP/R1B2RK1 w - - 0 1',
        moves: ['c1d2', 'c6b4']
      },
      {
        id: 'mg-pc-03',
        fen: '2r2rk1/pp3ppp/4pn2/3p4/3P4/2PB1N2/PP3PPP/R4RK1 w - - 0 1',
        moves: ['f1e1', 'f8e8']
      }
    ]
  },

  'space-advantage': {
    id: 'space-advantage', level: 2, title: 'Space Advantage',
    summary: [
      'A space advantage means your pawns are further advanced than your opponent\'s, giving your pieces more room to maneuver while cramping your opponent\'s pieces behind their own pawns. Space is one of the most fundamental advantages in chess — it gives you more options and your opponent fewer.',
      'The most common way to gain space is through central pawn advances. A pawn on e5 (for White) takes away the f6 and d6 squares from Black\'s pieces and forces them into passive positions. Combined with pawns on d4 and c4, White can build a massive space advantage that slowly suffocates the opponent.',
      'The danger of a space advantage is overextension — pushing too many pawns forward can leave weaknesses behind them. The side with less space should look for pawn breaks to open the position and free their pieces. The cramped side\'s best weapon is a well-timed exchange of pawns that releases the pressure.'
    ],
    examples: [
      {
        fen: 'r1bqk2r/pp1n1ppp/2p1pn2/3pP3/3P1P2/2N2N2/PPP3PP/R1BQKB1R w KQkq - 0 1',
        orientation: 'white',
        caption: 'White has a classic space advantage with pawns on d4, e5, and f4. Black\'s pieces are cramped — the Nd7 is blocked, the Nf6 can\'t go to its best square e4 (yet), and the bishop on c8 has no scope. White should maintain this pawn chain and slowly improve piece positions before Black finds a break.'
      },
      {
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has the "Maroczy Bind" — pawns on c4 and e4 control d5, denying Black\'s pieces their best square. Black\'s pieces are solid but passive. White\'s plan: maintain the bind, improve piece placement, and prevent Black from ever playing ...d5. Space advantage becomes permanent when the opponent can\'t break free.'
      }
    ],
    exercises: [
      {
        id: 'mg-sa-01',
        fen: 'r1bqk2r/pp1nbppp/2p1pn2/3p4/2PPP3/2N2N2/PP3PPP/R1BQKB1R w KQkq - 0 1',
        moves: ['e4e5', 'f6d7']
      },
      {
        id: 'mg-sa-02',
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['d4d5', 'c6b8']
      },
      {
        id: 'mg-sa-03',
        fen: 'r1bqk2r/ppp2ppp/2n1pn2/3pP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 1',
        moves: ['f1d3', 'c6b4']
      }
    ]
  },

  // ── LEVEL 3: INTERMEDIATE ───────────────────────────────────────────────────

  'prophylaxis': {
    id: 'prophylaxis', level: 3, title: 'Prophylaxis',
    summary: [
      'Prophylaxis is the art of preventing your opponent\'s plans before they become threats. Rather than reacting to threats after they appear, a prophylactic player asks: "What does my opponent WANT to do next?" and makes a move that stops it. This proactive thinking separates club players from advanced players.',
      'Prophylactic moves often look quiet and unimpressive because they don\'t create immediate threats of their own. A simple pawn move, a king retreat, or a rook shift might prevent a deeply dangerous plan. The strongest players spend as much time thinking about the opponent\'s ideas as their own.',
      'The hallmark of a prophylactic mindset is always asking "why?" about your opponent\'s last move. Every move changes the position. Ask: "What new possibilities did that create for them?" If you find the answer before they can execute, you can often prevent the plan with a single quiet move.'
    ],
    examples: [
      {
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 1',
        orientation: 'white',
        caption: 'The Sicilian Dragon. Black wants to play ...d5 to free the position. White\'s prophylactic move is f2-f3 (already played) — it supports e4 and prevents ...Ng4 or ...Nf5 ideas. Now White can castle queenside and launch a kingside pawn storm without worrying about the center collapsing.'
      },
      {
        fen: 'r4rk1/pp1nqppp/2pbpn2/3p4/2PP4/2NBPN2/PP2QPPP/R1B2RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Black is planning ...e5 to free the position. White plays a2-a3 prophylactically — preventing ...Nb4 hitting the Bd3 — THEN plays e3-e4 next move. Without a3, Black\'s Nb4 would fork the bishop and disrupt White\'s central buildup. One quiet prophylactic move enables the entire plan.'
      }
    ],
    exercises: [
      {
        id: 'mg-pr-01',
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQ1PPP/R3KB1R w KQ - 0 1',
        moves: ['f2f3', 'a7a6']
      },
      {
        id: 'mg-pr-02',
        fen: 'r4rk1/pp1nqppp/2pbpn2/8/2PP4/2NBPN2/PP2QPPP/R1B2RK1 w - - 0 1',
        moves: ['a2a3', 'e6e5']
      },
      {
        id: 'mg-pr-03',
        fen: 'r2q1rk1/pp2ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['h2h3', 'a7a6']
      }
    ]
  },

  'pawn-breaks': {
    id: 'pawn-breaks', level: 3, title: 'Pawn Breaks',
    summary: [
      'A pawn break is a pawn advance that challenges or disrupts the opponent\'s pawn chain. When the position is locked and neither side can improve their pieces easily, a well-timed pawn break opens the position and gives the active side more space and attacking possibilities.',
      'Every pawn structure has natural pawn breaks. In the King\'s Indian Defense, Black\'s break is ...f5 on the kingside while White plays c4-c5 on the queenside. In the French Defense, Black plays ...c5 and ...f6 to undermine White\'s center. Knowing the correct break for each structure is essential strategic knowledge.',
      'Before playing a pawn break, verify: does it open lines for YOUR pieces or your opponent\'s? A break that opens a file in front of your own king is dangerous. A break that opens lines toward the enemy king while keeping your own king safe is often decisive. Timing is critical — play the break when your pieces are positioned to exploit it.'
    ],
    examples: [
      {
        fen: 'r1bq1rk1/ppp2pbp/3p1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'King\'s Indian structure. White\'s thematic break is c4-c5, attacking Black\'s d6 pawn and opening the c-file for the rooks. Black\'s break is ...f5, attacking White\'s e4 pawn and opening the f-file for a kingside attack. Both sides race to execute their break first — this is the essence of KID play.'
      },
      {
        fen: 'rnbqk2r/ppp2ppp/4pn2/3pP3/3P4/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 1',
        orientation: 'white',
        caption: 'Advance French. Black\'s key break is ...c5, attacking the d4 base of White\'s pawn chain. If ...cxd4, the center opens and Black\'s pieces get activity. White should respond to ...c5 with c2-c3, supporting d4 and maintaining the chain. Understanding where to strike (the base) is the fundamental pawn-break concept.'
      }
    ],
    exercises: [
      {
        id: 'mg-pb-01',
        fen: 'r1bq1rk1/ppp2pbp/3p1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 0 1',
        moves: ['f7f5', 'e4f5']
      },
      {
        id: 'mg-pb-02',
        fen: 'rnbqk2r/pp3ppp/4pn2/2ppP3/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 1',
        moves: ['c2c3', 'c5d4']
      },
      {
        id: 'mg-pb-03',
        fen: 'r1bq1rk1/pppn1pbp/3p1np1/3Pp3/2P1P3/2N3P1/PP2PPBP/R1BQ1RK1 w - - 0 1',
        moves: ['c4c5', 'd6c5']
      }
    ]
  },

  'minority-attack': {
    id: 'minority-attack', level: 3, title: 'Minority Attack',
    summary: [
      'The minority attack is a strategic plan where you advance fewer pawns (the "minority") against a larger number of enemy pawns (the "majority") to create a weakness in the opponent\'s pawn structure. The goal is not to win pawns directly — it is to create a permanent isolated or backward pawn as a long-term target.',
      'The classic minority attack occurs in the Exchange Queen\'s Gambit. White has pawns on a2 and b2 (two pawns, the minority) against Black\'s pawns on a7, b7, c6 (three pawns, the majority). White advances b2-b4-b5, and after bxc6 or ...cxb5, Black ends up with a weak isolated c-pawn or a backward pawn that White can target for the rest of the game.',
      'The defending side against a minority attack should find active counterplay — typically in the center or on the kingside. Passive defense usually fails because the attacker can take all the time needed to perfect the plan. The defender must create threats that force the attacker to divert resources.'
    ],
    examples: [
      {
        fen: 'r1bq1rk1/pp1n1ppp/2p1pn2/3p4/3P4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'The classic Exchange QGD structure. White\'s minority attack plan: b2-b4-b5. If Black takes ...cxb5, the c-file opens and Black\'s d5 pawn becomes isolated. If Black ignores it, bxc6 gives Black doubled c-pawns. White methodically prepares: Rb1, then b4, then b5. A textbook strategic plan.'
      },
      {
        fen: 'r1bq1rk1/pp1n1ppp/2p1pn2/3p4/1P1P4/2N1PN2/P3BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has already played b4 — the minority attack is underway. Next comes b5, challenging c6. Black should seek counterplay with ...e5 (central break) or ...Ne4 (active piece play) rather than passively waiting. The minority attack is slow enough that the defender has time to create counterplay — but only if they act.'
      }
    ],
    exercises: [
      {
        id: 'mg-ma-01',
        fen: 'r1bq1rk1/pp1n1ppp/2p1pn2/3p4/3P4/2N1PN2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['b2b4', 'a7a6']
      },
      {
        id: 'mg-ma-02',
        fen: 'r1bq1rk1/pp1n1ppp/2p1pn2/3p4/1P1P4/2N1PN2/P3BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['b4b5', 'c6b5']
      },
      {
        id: 'mg-ma-03',
        fen: 'r1bq1rk1/1p1n1ppp/p1p1pn2/3p4/1P1P4/2N1PN2/P3BPPP/1RBQ1RK1 w - - 0 1',
        moves: ['b4b5', 'a6b5']
      }
    ]
  },

  'blockade': {
    id: 'blockade', level: 3, title: 'Blockade',
    summary: [
      'A passed pawn — a pawn with no enemy pawns in front of it or on adjacent files — is a potential queen. The strongest way to neutralize it is the blockade: placing a piece directly in front of it on the square it wants to advance to. The blockading piece stops the pawn from moving and often sits on a powerful square as a bonus.',
      'Knights make the best blockaders because they are not diminished by sitting in front of a pawn. A knight blockading on d5 attacks c3, c7, e3, e7, b4, b6, f4, f6 — a very active blockader. Nimzovich called the blockading knight "the perfect fighter against the passed pawn." Bishops and rooks make poor blockaders because their line-based power is wasted on a single square.',
      'To break a blockade, the side with the passed pawn must try to force the blockader away — either by attacking it with pawns, trading it off, or creating threats elsewhere that force the blockader to abandon its post. The blockading side must keep the blockader immovable while building other advantages.'
    ],
    examples: [
      {
        fen: '4r1k1/pp3ppp/8/3pN3/8/8/PP3PPP/4R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s knight on e5 blockades and controls the area around Black\'s passed d5 pawn. The knight on e5 is perfectly placed: it stops ...d4, attacks f7 and d7, and controls c4 and c6. This is the ideal blockade — the piece that stops the pawn is also the most active piece on the board.'
      },
      {
        fen: '4r1k1/pp3ppp/8/3p4/3P4/4N3/PP3PPP/4R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s knight on e3 should move to d4 or d5 to blockade Black\'s d5 pawn if it were passed. Even when the pawn isn\'t passed yet, placing a knight in front of an enemy pawn chain restricts it. The blockade concept applies to any pawn you want to stop — not just passed pawns.'
      }
    ],
    exercises: [
      {
        id: 'mg-bl-01',
        fen: '4r1k1/pp3ppp/8/3p4/8/4N3/PP3PPP/4R1K1 w - - 0 1',
        moves: ['e3d5', 'e8e1']
      },
      {
        id: 'mg-bl-02',
        fen: 'r4rk1/pp3ppp/8/3pP3/2n5/2N5/PP3PPP/R4RK1 w - - 0 1',
        moves: ['c3d5', 'c4e3']
      },
      {
        id: 'mg-bl-03',
        fen: '2r3k1/pp3ppp/8/3Pp3/4P3/5N2/PP3PPP/2R3K1 w - - 0 1',
        moves: ['f3d4', 'e5d4']
      }
    ]
  },

  'good-bad-bishop': {
    id: 'good-bad-bishop', level: 3, title: 'Good vs Bad Bishop',
    summary: [
      'A "good bishop" has most of its own pawns on the opposite color, leaving its diagonals open and active. A "bad bishop" has most of its own pawns on the same color as the bishop, blocking its diagonals and reducing it to a passive defensive role.',
      'A bad bishop is one of the most common long-term disadvantages in chess. If your pawns are fixed on light squares and you have a light-squared bishop, that bishop spends the whole game defending pawns instead of attacking. Your opponent\'s pieces on dark squares roam freely while your bishop watches helplessly.',
      'To improve a bad bishop: exchange it for the opponent\'s knight (which covers the squares your bishop can\'t), restructure your pawns by advancing them off the bishop\'s color, or "activate" the bishop by placing it outside the pawn chain (e.g., Bc8-d7-b5). If none of these work, the bad bishop remains a permanent disadvantage.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp1b1ppp/2p1p3/3pP3/3P4/3B4/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s bishop on d3 is "bad" — its own pawns on d4 and e5 are on light-square diagonals, blocking the bishop\'s scope. It can only look at e2, c2, b1 — useless squares. Black\'s Bd7 is also somewhat limited but can at least move to e8-h5 or c8-a6. Both bishops are mediocre, but White\'s is worse because it\'s blocked by its own center.'
      },
      {
        fen: 'r4rk1/pp3ppp/4pn2/2pp4/3P4/2P1PN2/PP1B1PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s Bd2 is bad — pawns on c3, d4, e3 are all on dark squares, the same color as the bishop. It has almost no useful diagonal. Black should exploit this by playing on dark squares where the bishop can\'t defend. The classic remedy: trade the bad bishop for a knight, or move the pawns off the dark squares.'
      }
    ],
    exercises: [
      {
        id: 'mg-gb-01',
        fen: 'r4rk1/pp1b1ppp/2p1pn2/3pP3/3P4/3BBN2/PP3PPP/R4RK1 w - - 0 1',
        moves: ['e3d2', 'f6h5']
      },
      {
        id: 'mg-gb-02',
        fen: 'r4rk1/pp3ppp/4pn2/2pp4/3P4/2PBPN2/PP3PPP/R4RK1 w - - 0 1',
        moves: ['d3a6', 'b7a6']
      },
      {
        id: 'mg-gb-03',
        fen: 'r4rk1/pp1b1ppp/2p1p3/3p4/3PP3/3B4/PP3PPP/R4RK1 w - - 0 1',
        moves: ['d3b1', 'd7c8']
      }
    ]
  },

  // ── LEVEL 4: ADVANCED ────────────────────────────────────────────────────────

  'restricting-opponent': {
    id: 'restricting-opponent', level: 4, title: 'Restricting the Opponent',
    summary: [
      'Restriction is the strategy of limiting your opponent\'s piece mobility and options until their position becomes passive and suffocated. Rather than attacking directly, you maneuver your pieces to take away all good squares, close critical lines, and leave the opponent with only bad moves.',
      'The classic tool of restriction is space. By maintaining a large pawn center (e5 and d4), you squeeze the opponent into a small area where their pieces interfere with each other. Nimzovich described this as "the strategy of the boa constrictor" — you tighten the coil gradually until the opponent cannot breathe.',
      'Restriction also applies to individual pieces. If you can permanently keep an opponent\'s bishop off an important diagonal, or prevent their rook from reaching an open file, you\'ve effectively removed a piece from the game. Look for moves that accomplish this quietly — often the opponent won\'t notice the restriction until it\'s complete.'
    ],
    examples: [
      {
        fen: 'r2q1rk1/pp1nbppp/4pn2/2ppP3/3P4/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s e5 pawn restricts Black\'s entire position. The Nf6 is denied its best square (e4 via d7 is the only route), the Bd7 is cramped, and the Nd7 blocks the bishop. White should maintain e5 at all costs — every exchange that removes this pawn frees Black\'s game. Restriction means maintaining the bind, not releasing tension.'
      },
      {
        fen: 'r1bq1rk1/pp2ppbp/2n3p1/2ppP3/3P4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a space advantage with e5, but Black has counterplay with ...f6 threatening to break open the center. White\'s restrictive response: f2-f4, reinforcing e5 and preventing ...f6. Now Black\'s entire kingside is frozen. When you restrict, maintain the clamp — don\'t let the opponent wriggle free.'
      }
    ],
    exercises: [
      {
        id: 'mg-ro-01',
        fen: 'r2q1rk1/pp1nbppp/4pn2/2ppP3/3P4/2NB1N2/PPP2PPP/R1BQ1RK1 w - - 0 1',
        moves: ['f3g5', 'h7h6']
      },
      {
        id: 'mg-ro-02',
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['e4e5', 'f6e8']
      },
      {
        id: 'mg-ro-03',
        fen: 'r2q1rk1/pp1n1ppp/2pbpn2/3pP3/3P4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 1',
        moves: ['f3g5', 'h7h6']
      }
    ]
  },

  'favorable-endgames': {
    id: 'favorable-endgames', level: 4, title: 'Exchanging into Favorable Endgames',
    summary: [
      'One of the most powerful weapons in chess is the ability to steer the game toward an endgame that is structurally won for you. This means recognizing which endgame is favorable given the current pawn structure and piece imbalances, then trading pieces until you reach it.',
      'The classic example: you have a bishop and your opponent has a knight. The position has pawns on both wings. You should trade all other pieces — rooks, queens — to reach a bishop vs knight ending where the bishop\'s long range is decisive. Your opponent, recognizing this, might refuse the trades — forcing them into passivity.',
      'Favorable endgame thinking is a form of positional planning: "If I can reach position X, I win. Therefore, I will execute all trades that lead toward X." This is more reliable than tactical complications because endgame advantages are permanent — once you have a better pawn structure and king position, the win is a matter of technique.'
    ],
    examples: [
      {
        fen: 'r3r1k1/pp2bppp/2p1pn2/3p4/3P4/2N1BN2/PP2BPPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a slight edge — the Be3 is more active than the Be7. White should aim for a bishop endgame where Be3 is good (pawns on light squares) and Be7 is passive. Trade the rooks and knights to reach that endgame. Identifying the winning endgame type is the first step; steering toward it is the skill.'
      },
      {
        fen: '4r1k1/pp2bppp/2p1p3/3pP3/3P4/2P1B3/PP4PP/4R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'A simplified position. White\'s Be3 is good (White pawns on c3, d4, e5 — dark squares, leaving light diagonals open). Black\'s Be7 is bad (blocked by e6 and pawn chain). Trading rooks here (Re1xe8) leads to a bishop endgame White should win — the good bishop dominates the bad one in an endgame.'
      }
    ],
    exercises: [
      {
        id: 'mg-fe-01',
        fen: '2r2rk1/pp2bppp/2p1pn2/3p4/3P4/2N1BN2/PP2BPPP/2R2RK1 w - - 0 1',
        moves: ['c1c2', 'f8c8']
      },
      {
        id: 'mg-fe-02',
        fen: '4r1k1/pp2bppp/2p1pn2/3p4/3P4/4BN2/PP2BPPP/4R1K1 w - - 0 1',
        moves: ['f3d2', 'f6d7']
      },
      {
        id: 'mg-fe-03',
        fen: '4r1k1/pp2bppp/2p1p3/3pP3/3P4/2P1B3/PP4PP/4R1K1 w - - 0 1',
        moves: ['e1e2', 'e8e7']
      }
    ]
  },

  'pawn-storm': {
    id: 'pawn-storm', level: 4, title: 'Pawn Storm',
    summary: [
      'A pawn storm is the aggressive advance of multiple pawns toward the enemy king, with the goal of tearing open the pawn shelter and exposing the king to attack. It is the most direct attacking weapon in chess and is typically used when the kings have castled on opposite sides.',
      'The key prerequisite for a pawn storm is that YOUR king is safe. If both kings are on the same side, advancing the pawns exposes your own king. Opposite-side castling changes this: your pawns advance toward the enemy king while your own king sits safely on the other wing.',
      'The pawn storm must be supported by pieces. Advancing pawns without pieces ready to exploit the opened lines is wasteful. The ideal sequence: castle on opposite sides, coordinate your pieces, THEN launch the pawn avalanche knowing your rooks and queen are ready to pour through the opened files.'
    ],
    examples: [
      {
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 1',
        orientation: 'white',
        caption: 'Sicilian Dragon with opposite-side castling. White\'s king is on c1 (safe on the queenside), while Black\'s king is on g8. White\'s pawn storm plan: g2-g4, h2-h4, h4-h5, opening lines against Black\'s kingside. The pawns act as battering rams while White\'s pieces (Qd2, Be3, Rd1) support the attack.'
      },
      {
        fen: '2kr3r/ppp2ppp/2n1bn2/4p3/4P3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Black has castled queenside. White should launch a pawn storm with a2-a4-a5, combined with b2-b4. The goal: rip open the a and b files to reach Black\'s king. Meanwhile White\'s king on g1 is far from the action and safe. Opposite-side castling almost always leads to mutual pawn storms — the faster attack wins.'
      }
    ],
    exercises: [
      {
        id: 'mg-pstorm-01',
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 1',
        moves: ['g2g4', 'a7a5']
      },
      {
        id: 'mg-pstorm-02',
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP1P1/2N1BP2/PPPQ3P/2KR1B1R w - - 0 1',
        moves: ['h2h4', 'b7b5']
      },
      {
        id: 'mg-pstorm-03',
        fen: '2kr3r/ppp2ppp/2n1bn2/4p3/4P3/2N2N2/PPP1BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['a2a4', 'g7g5']
      }
    ]
  },

  'two-bishops': {
    id: 'two-bishops', level: 4, title: 'The Two Bishops Advantage',
    summary: [
      'Having both bishops (one light-squared, one dark-squared) while your opponent has a bishop and knight, or two knights, gives you the "bishop pair advantage." The two bishops complement each other — together they cover all 64 squares and can coordinate attacks from long range on both colors simultaneously.',
      'The bishop pair is especially strong in open positions. In the endgame, two bishops vs bishop and knight often leads to a technically won position — the two bishops can create mating threats and zugzwang situations that a knight cannot match. Grandmasters treat obtaining the bishop pair as a significant achievement.',
      'To exploit the bishop pair, OPEN THE POSITION. Advance pawns to open diagonals. Exchange pawns that block your bishops\' scope. Avoid locked pawn structures where a knight on an outpost can be superior. The bishop pair is strongest when the position is fluid, open, and the pawns are mobile.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n1p3/3p4/3P4/4PN2/PP1B1PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has bishop + knight vs Black\'s lone knight. But if White had BOTH bishops (imagine a Bb5 too), the bishop pair would dominate the knight in this open position. The key to exploiting the bishop pair: keep the position open. Push e3-e4 to open diagonals and give both bishops maximum range.'
      },
      {
        fen: 'r4rk1/pp3ppp/4p3/3p4/3P4/1P2P3/PB3PPP/R2B1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has the bishop pair (Bb2 on the long diagonal, Bd1 ready to go to b3 or c2). Black has no minor pieces here but imagine a knight — the bishops working together cover all squares. Bb2 controls the a1-h8 diagonal while Bd1 can reach a4, b3, c2, or e2 for the other color. Together they are very powerful.'
      }
    ],
    exercises: [
      {
        id: 'mg-tb-01',
        fen: 'r4rk1/pp3ppp/2n1p3/3p4/1b1P4/2N1P3/PPB2PPP/R1B2RK1 w - - 0 1',
        moves: ['a2a3', 'b4c3']
      },
      {
        id: 'mg-tb-02',
        fen: 'r4rk1/pp2ppbp/2n3p1/3p4/3P4/2P1BN2/PP2BPPP/R4RK1 w - - 0 1',
        moves: ['f3d2', 'e7e5']
      },
      {
        id: 'mg-tb-03',
        fen: 'r4rk1/pp3ppp/4pn2/3p4/3P4/1P2PN2/PB3PPP/R4RK1 w - - 0 1',
        moves: ['f1d3', 'f6e4']
      }
    ]
  },

  'rook-seventh': {
    id: 'rook-seventh', level: 4, title: 'Rook on the Seventh Rank',
    summary: [
      'A rook on the seventh rank (for White: rank 7; for Black: rank 2) is one of the most powerful piece placements in chess. From the seventh rank, a rook attacks all enemy pawns that haven\'t advanced, restricts the king to the back rank, and can create devastating threats.',
      'Two rooks on the seventh rank together are almost always decisive — they devour pawns and create unstoppable mating threats. Even a single rook on the seventh can be worth more than a pawn in practical terms, tying down the opponent\'s entire army to passive defense.',
      'To exploit a rook on the seventh: combine it with back-rank threats (if the king has no escape), advance passed pawns while the rook ties down defenders, or double rooks on the seventh for a killing blow. The defending side should try to activate their own rook, trade rooks, or give the king an escape square.'
    ],
    examples: [
      {
        fen: '5rk1/pp1R1ppp/4p3/8/8/4P3/PP3PPP/6K1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s rook on d7 dominates the seventh rank. It attacks b7, c7, f7, and pins Black to passive defense. Black\'s rook on f8 must stay on the back rank to prevent Rd8+ mating threats. A single rook on the seventh can paralyze the opponent\'s entire position.'
      },
      {
        fen: '6k1/pp1RRppp/4p3/8/8/4P3/PP3PPP/6K1 w - - 0 1',
        orientation: 'white',
        caption: 'Doubled rooks on the seventh! Rd7 and Re7 together attack b7, c7, f7, and g7 simultaneously. Black\'s king is trapped on the back rank and the pawns are falling. Doubled rooks on the seventh is one of the most powerful configurations in chess — often an immediate win.'
      }
    ],
    exercises: [
      {
        id: 'mg-r7-01',
        fen: '4r1k1/pp3ppp/4p3/8/8/4P3/PP3PPP/R5K1 w - - 0 1',
        moves: ['a1a7', 'e8e7']
      },
      {
        id: 'mg-r7-02',
        fen: '4r1k1/pp3ppp/4p3/8/8/4P3/PP3PPP/1R4K1 w - - 0 1',
        moves: ['b1b7', 'a7a6']
      },
      {
        id: 'mg-r7-03',
        fen: '4r1k1/ppR2ppp/4p3/8/8/4P3/PP3PPP/4R1K1 w - - 0 1',
        moves: ['e1e7', 'e8e7']
      }
    ]
  },

  'imbalances': {
    id: 'imbalances', level: 4, title: 'Creating and Exploiting Imbalances',
    summary: [
      'Every chess position contains imbalances — factors that make one side\'s position different from the other\'s. Common imbalances include: better piece activity, superior pawn structure, the bishop pair, a space advantage, a lead in development, or a strong passed pawn. Recognizing which imbalances exist tells you what plan to pursue.',
      'Rather than playing random moves or hoping for tactics, strong players identify their key imbalance and make a plan to maximize it. If you have the bishop pair, open the position. If you have a space advantage, prevent counterplay. If you have better development, open the game before the opponent catches up.',
      'The most important skill is knowing which imbalance to CREATE. Before trading pieces, ask: does this trade give me a favorable imbalance? Creating imbalances means deliberately steering the game toward a type of position that suits YOUR pieces better than the opponent\'s.'
    ],
    examples: [
      {
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2BPP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Imbalances: White has more central space (d4+e4), but Black has the Bg7 on a strong diagonal and the flexible ...d5 or ...e5 breaks. White\'s plan: maintain the center and exploit the space. Black\'s plan: undermine the center. Each side plays to maximize their specific imbalance.'
      },
      {
        fen: 'r4rk1/pp2ppbp/2np2p1/q7/2PPP3/2N5/PP1QBPPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a massive center (c4, d4, e4) — a space imbalance. Black has the Bg7 pressuring d4 and the Qa5 targeting a2. The game will be decided by whether White\'s center holds or Black breaks through. Identify the key imbalance, then play every move to maximize YOUR side of it.'
      }
    ],
    exercises: [
      {
        id: 'mg-im-01',
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/2BPP3/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 1',
        moves: ['d4d5', 'c6b8']
      },
      {
        id: 'mg-im-02',
        fen: 'r1b2rk1/pp2ppbp/2np1np1/q7/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['e4e5', 'f6e8']
      },
      {
        id: 'mg-im-03',
        fen: 'r1bq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['d4d5', 'c6e5']
      }
    ]
  },

  'iqp-positions': {
    id: 'iqp-positions', level: 4, title: 'Isolated Queen Pawn (IQP)',
    summary: [
      'The Isolated Queen Pawn (IQP) is a d-pawn with no neighboring pawns on the c or e files to support it. IQP positions are among the most important structures in chess — they arise from the Queen\'s Gambit, French Defense, Caro-Kann, and many other openings. Understanding both sides of the IQP is essential for every serious player.',
      'The IQP side has dynamic advantages: the pawn controls e5 and c5, gives pieces open lines and outposts. The typical plan: place a knight on e5, a bishop on the b1-h7 diagonal, rooks on open files, and launch a kingside attack. The d4-d5 push is the key break — if it can be played favorably, the IQP transforms from a weakness into a battering ram.',
      'The side AGAINST the IQP should blockade it (place a piece on d5), trade pieces to reach an endgame where the IQP is a permanent weakness, and avoid allowing the d4-d5 break. Knights are ideal blockaders on d5. The more pieces that get traded, the weaker the IQP becomes — in the endgame, it\'s a liability that must be defended passively.'
    ],
    examples: [
      {
        fen: 'r1b2rk1/pp2ppbp/2n3p1/3q4/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has an IQP on d4. The pawn controls c5 and e5, giving White outposts for pieces. White\'s plan: Nc3-e4, Bf4 controlling the c1-h6 diagonal, and eventually push d4-d5 to open the position. The IQP is a strength in the middlegame — it gives White dynamic piece play and attacking chances.'
      },
      {
        fen: 'r1bq1rk1/pp2ppbp/2n3p1/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'A different perspective: Black has an IQP on d5. White\'s plan is to blockade it with a knight on d4 (Nd4), then trade pieces to reach an endgame where d5 is a permanent target. The fewer pieces on the board, the more the IQP becomes a weakness. Strategic simplification is the key anti-IQP plan.'
      }
    ],
    exercises: [
      {
        id: 'mg-iqp-01',
        fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/2PP4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['c4d5', 'e6d5']
      },
      {
        id: 'mg-iqp-02',
        fen: 'r1b2rk1/pp3ppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 1',
        moves: ['f3d2', 'f6d7']
      },
      {
        id: 'mg-iqp-03',
        fen: 'r1bq1rk1/pp3ppp/2n2n2/3p4/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['f3e5', 'c6e5']
      }
    ]
  },

  'opposite-castling': {
    id: 'opposite-castling', level: 4, title: 'Opposite-Side Castling Attacks',
    summary: [
      'When kings castle on opposite sides, the game becomes a race: both sides launch pawn storms against the enemy king while their own king sits safely on the other wing. These positions are among the most exciting and sharp in chess — a single tempo can decide the game.',
      'The attacking plan is straightforward: advance pawns toward the enemy king to rip open files. On the kingside, this means h4-h5 or g4-g5 (for White attacking a Black king on g8). On the queenside, a4-a5 or b4-b5. The pawns act as battering rams — once a file opens, your rooks and queen flood through.',
      'The critical strategic decision is: whose attack arrives first? Factors that determine this: how many moves until you open a file, how quickly your pieces can join the attack, and whether the opponent can slow your storm with prophylactic moves. Often the side with a slight development lead or whose pawns are closer to the enemy king wins the race.'
    ],
    examples: [
      {
        fen: '2kr3r/pppbqppp/2n1pn2/3p4/3P4/2NBPN2/PPPQ1PPP/2KR3R w - - 0 1',
        orientation: 'white',
        caption: 'A typical opposite-castling position from the Slav. White\'s king is on c1, Black\'s on c8. White attacks the queenside with a4-a5 or b4-b5. Black attacks White\'s king with ...e5 or ...g5-g4. This is a pure racing situation — whoever opens lines first gets the decisive attack. Speed is everything.'
      },
      {
        fen: 'r1b2rk1/pp2ppbp/2np1np1/q7/3NP3/2N1B1P1/PPPQ1P1P/R3KB1R w KQ - 0 1',
        orientation: 'white',
        caption: 'Sicilian Dragon with 0-0-0. White will push g4, h4, h5 to attack Black\'s kingside. Black will push ...a5, ...a4 to attack White\'s queenside. The Be3+Qd2 battery targets h6 (after h5xg6 fxg6, Bh6 trades the defensive Bg7). Both attacks happen simultaneously — concrete calculation decides who wins.'
      }
    ],
    exercises: [
      {
        id: 'mg-oc-01',
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 1',
        moves: ['g2g4', 'a7a5']
      },
      {
        id: 'mg-oc-02',
        fen: '2kr3r/pppbqppp/2n1pn2/3p4/3PP3/2N2N2/PPP1BPPP/R1BQK2R w KQ - 0 1',
        moves: ['e1g1', 'g7g5']
      },
      {
        id: 'mg-oc-03',
        fen: 'r1b2rk1/pp2ppbp/2np1np1/q7/3NP1P1/2N1BP2/PPPQ3P/2KR1B1R w - - 0 1',
        moves: ['h2h4', 'b7b5']
      }
    ]
  },

  // ── LEVEL 5: EXPERT ─────────────────────────────────────────────────────────

  'dynamic-vs-static': {
    id: 'dynamic-vs-static', level: 5, title: 'Dynamic vs Static Advantages',
    summary: [
      'Positional advantages come in two types: static (permanent features like pawn structure weaknesses, bishop vs knight in certain structures) and dynamic (temporary but energetic features like development lead, open lines, piece activity, a sacrificial attack). Understanding which type you have determines how urgently you must act.',
      'Dynamic advantages MUST be exploited immediately. If you\'re ahead in development, you must open the position NOW — every move of delay gives the opponent time to catch up. If you have a temporary initiative, maintain the pressure — one free move to consolidate and your advantage evaporates. Dynamic play is all about tempo.',
      'Static advantages can be exploited slowly. A bad bishop, an isolated pawn, a permanent weak square — these will still be there in twenty moves. Take your time to improve your pieces, create secondary threats, and improve your position before cashing in. Rushing a static advantage often squanders it; patience converts it into a win.'
    ],
    examples: [
      {
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
        orientation: 'white',
        caption: 'A dynamic position (Italian Game). White has a slight development lead and the Bc4 eyes f7. This is a DYNAMIC advantage — it must be used now. If White plays passively (e.g., d3, Be2), Black catches up in development and the advantage disappears. White should play actively: 0-0, d4, or even the Evans Gambit (b4!?).'
      },
      {
        fen: 'r4rk1/pp2ppbp/2p3p1/3p4/3P1B2/2N5/PP2BPPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'A static advantage for White. Black\'s pawn on d5 creates a weak c5 square (no pawn can guard it). Black\'s Bg7 is passive (blocked by its own d5 and e7 pawns). These are STATIC weaknesses — they won\'t disappear. White can slowly maneuver: Nc3-a4-c5, or Bf4-d6, at leisure. No need to rush.'
      }
    ],
    exercises: [
      {
        id: 'mg-ds-01',
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 0 4',
        moves: ['d2d4', 'e5d4']
      },
      {
        id: 'mg-ds-02',
        fen: 'r4rk1/pp2ppbp/2p3p1/3p4/3P1B2/2N5/PP2BPPP/R4RK1 w - - 0 1',
        moves: ['c3a4', 'e7e6']
      },
      {
        id: 'mg-ds-03',
        fen: 'r1b1kb1r/pppp1ppp/2n2n2/4p2q/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
        moves: ['d2d4', 'e5d4']
      }
    ]
  },

  'positional-piece-sac': {
    id: 'positional-piece-sac', level: 5, title: 'Positional Piece Sacrifice',
    summary: [
      'A positional piece sacrifice gives up material without an immediate forced win. Unlike tactical combinations, the compensation is long-term and positional — you sacrifice a piece for: destruction of the opponent\'s pawn shelter, creation of a passed pawn, gaining a dominant outpost, or eliminating a key defensive piece.',
      'The most famous positional sacrifices involve giving a knight or bishop to shatter the opponent\'s pawn structure around the castled king. Even if you don\'t win immediately, the resulting exposed king creates permanent attacking chances that outweigh the material deficit.',
      'Positional sacrifices require accurate positional judgment — the ability to evaluate whether long-term compensation is sufficient. At club level, most sacrifices should be backed by concrete calculation. At master level, feel and intuition guide sacrifices that may not be objectively correct but are practically winning because the resulting positions are extremely difficult to defend.'
    ],
    examples: [
      {
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 1',
        orientation: 'white',
        caption: 'A typical Sicilian Dragon position. White considers the sacrifice Nd5!? — if ...Nxd5 exd5, White has a powerful pawn on d5 that splits Black\'s position, opens the e-file, and the Be3 + Qd2 battery becomes devastating. The piece sacrifice destroys Black\'s coordination and creates lasting pressure.'
      },
      {
        fen: 'r2q1rk1/pb2ppbp/1pn3p1/2p1P3/2B5/2N2N2/PPP2PPP/R2QR1K1 w - - 0 1',
        orientation: 'white',
        caption: 'White considers Bxf7+!? sacrificing a bishop to expose the king. After ...Kxf7, the king is in the open and White gets Ng5+ with a strong attack. Even if Black survives, the exposed king is a permanent weakness. This sacrifice works because the resulting attack is worth more than a piece — the initiative is overwhelming.'
      }
    ],
    exercises: [
      {
        id: 'mg-pps-01',
        fen: 'r1bq1rk1/ppp2ppp/2n1pn2/3p4/2PP4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['c4d5', 'e6d5']
      },
      {
        id: 'mg-pps-02',
        fen: 'r2q1rk1/pp2ppbp/2n3p1/2p1Pb2/2B5/2N2N2/PPP2PPP/R2QR1K1 w - - 0 1',
        moves: ['c4f7', 'g8f7']
      },
      {
        id: 'mg-pps-03',
        fen: 'r1bqr1k1/pp3pbp/2np1np1/4p3/4P3/1NN1B1P1/PPP1BPKP/R2Q1R2 w - - 0 1',
        moves: ['b3d4', 'e5d4']
      }
    ]
  },

  'exchange-sacrifice': {
    id: 'exchange-sacrifice', level: 5, title: 'Positional Exchange Sacrifice',
    summary: [
      'Giving up a rook for a bishop or knight (the "exchange") is a material deficit — but sometimes the positional gains make it worthwhile. The exchange sacrifice is one of the most sophisticated weapons in chess, requiring deep positional understanding to evaluate correctly.',
      'The classic exchange sacrifice occurs when: a piece on a dominant outpost is so strong it must be eliminated (Rxe5 to remove a monster knight), or when you gain structural advantages (destroying the opponent\'s pawn structure), or when you gain a dominant light or dark-square complex with your remaining pieces.',
      'Exchange sacrifices are especially effective when the opponent\'s rooks have no open files to use. If a rook has no targets and sits passively, its nominal value (5 points) is theoretical. A knight on d5 actively controlling 8 squares might be worth more in practice than a rook trapped on h1. Always evaluate pieces by their activity, not their abstract value.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp2ppbp/2n3p1/q1ppP3/8/2N2NP1/PP2PPBP/R1BQR1K1 w - - 0 1',
        orientation: 'white',
        caption: 'White might sacrifice the exchange with Rxc5!? — giving rook for knight. After ...Qxc5, White has a powerful bishop pair and the dark squares are weakened. With the Bg2 on the long diagonal and e5 pawn cramping Black, the compensation is excellent. The exchange sacrifice works when the remaining pieces are dominant.'
      },
      {
        fen: 'r2q1rk1/pppb1ppp/2n1pn2/3pN3/3P4/2N1P3/PP2BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s Ne5 is a monster outpost. If Black tries ...Rxe5 to eliminate it, that\'s an exchange sacrifice! ...Rxe5 dxe5, and while Black gave a rook for a knight, the dominant knight is gone and Black\'s remaining pieces can breathe. Sometimes the defending side makes the exchange sacrifice — to neutralize a dominant piece.'
      }
    ],
    exercises: [
      {
        id: 'mg-es-01',
        fen: 'r2q1rk1/pp2ppbp/2np2p1/2p1P3/8/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 1',
        moves: ['f3d4', 'c6d4']
      },
      {
        id: 'mg-es-02',
        fen: 'r2q1rk1/pppb1ppp/2n1pn2/3pN3/3P4/2N1P3/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['e5c6', 'b7c6']
      },
      {
        id: 'mg-es-03',
        fen: 'r1bqr1k1/pp3pbp/2np1np1/4p3/3NP3/2N1B1P1/PPP1BPKP/R2Q1R2 w - - 0 1',
        moves: ['d4c6', 'b7c6']
      }
    ]
  },

  'simplification': {
    id: 'simplification', level: 5, title: 'Simplification — Converting a Won Game',
    summary: [
      'One of the most difficult skills in chess is converting a won position into an actual win. Many players have outplayed their opponent positionally only to let the win slip through complications or time trouble. The antidote is simplification: trading off pieces to reach a won endgame.',
      'When you are ahead in material, trade queens first — they create the most counterplay for the defending side. Every piece traded moves you closer to a decisive endgame. Avoid unnecessary complications — accept equal trades even if you think you can "do better." Greed loses more games than generosity.',
      'The formula: identify your advantage, identify the simplest path that preserves it, and execute patiently. If you have an extra pawn, improve your king, advance your pawns, and trade when it maintains the advantage. Never trade pieces in a way that gives the opponent counterplay just to avoid some complexity.'
    ],
    examples: [
      {
        fen: 'r1bq1rk1/pp3ppp/2n1pn2/2Pp4/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a slight advantage (more space with c5 and d4). To convert, White should simplify: trade the queens (Qd2-a5 offering a trade), then trade one pair of rooks. In the resulting minor piece endgame, White\'s space advantage and active pieces will gradually convert. Don\'t complicate — simplify!'
      },
      {
        fen: '4r1k1/pp3ppp/4pn2/3p4/3P4/4PN2/PP3PPP/4R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'An equal-looking endgame, but White has a small edge: the e3 pawn supports d4, and White can activate the king via Kf2-e2-d3. The key to conversion: don\'t rush. Improve the king position, put the rook on an active square, then look for the right moment to create a passed pawn or win material.'
      }
    ],
    exercises: [
      {
        id: 'mg-sim-01',
        fen: '2r2rk1/pp3ppp/2n1pn2/3p4/3P4/2N1PN2/PP2BPPP/2R2RK1 w - - 0 1',
        moves: ['c1c2', 'f8c8']
      },
      {
        id: 'mg-sim-02',
        fen: '2r3k1/pp3ppp/4pn2/3p4/3P4/4PN2/PP2BPPP/2R3K1 w - - 0 1',
        moves: ['c1c8', 'f6e8']
      },
      {
        id: 'mg-sim-03',
        fen: 'r1bq1rk1/pp3ppp/2n1pn2/3p4/3P4/2N1BN2/PP2BPPP/R2Q1RK1 w - - 0 1',
        moves: ['f3e5', 'c6e5']
      }
    ]
  },

  'two-weaknesses': {
    id: 'two-weaknesses', level: 5, title: 'The Principle of Two Weaknesses',
    summary: [
      'One of the most important principles in positional chess: a single weakness is often not enough to win. The defending side can concentrate all their pieces to defend one weak pawn or one weak square. But when you create a SECOND weakness, the defender cannot be in two places at once, and eventually one weakness falls.',
      'The technique works as follows: first fix one weakness and threaten it enough to tie down the defender\'s pieces. Then, while their pieces are committed to defending, create a second weakness on the OTHER wing. The defender must split their forces, and inevitably one weakness becomes indefensible.',
      'This is why strong players don\'t immediately attack a weakness — they first ask whether they can create a second one. Only when both weaknesses exist do they launch the final assault. The most common sequence: use a kingside space advantage to fix a weak kingside pawn, then advance on the queenside to create a second target.'
    ],
    examples: [
      {
        fen: 'r4rk1/1p3ppp/p2p1n2/3Pp3/4P3/2N5/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Black has two weaknesses: the backward d6 pawn and the weak a6 pawn. If White attacks only d6, Black defends with ...Rd8 and ...Nd7. But if White also pressures a6 (Ra1-a4-a5), Black can\'t defend both. White should alternate pressure between the two weaknesses until one falls.'
      },
      {
        fen: '2r3k1/pp2rppp/3p1n2/3Pp3/4P3/2N5/PP3PPP/1R3RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Black\'s d6 pawn is weak (backward, can\'t advance). Black\'s rooks are tied to defending it. White should now create a second weakness: advance a2-a4-a5 to target b7 or a7. When Black must defend both d6 AND the queenside, their pieces will be overloaded and one weakness will fall.'
      }
    ],
    exercises: [
      {
        id: 'mg-tw-01',
        fen: 'r4rk1/1p3ppp/p2p1n2/3Pp3/4P3/2N5/PP3PPP/R4RK1 w - - 0 1',
        moves: ['a2a4', 'a8c8']
      },
      {
        id: 'mg-tw-02',
        fen: '2r3k1/pp2rppp/3p1n2/3Pp3/P3P3/2N5/1P3PPP/1R3RK1 w - - 0 1',
        moves: ['a4a5', 'a7a6']
      },
      {
        id: 'mg-tw-03',
        fen: 'r3r1k1/pp3ppp/3p1n2/3Pp3/4P3/2N5/PP3PPP/R3R1K1 w - - 0 1',
        moves: ['c3b5', 'd6d5']
      }
    ]
  },

  // ── LEVEL 6: MASTER ─────────────────────────────────────────────────────────

  'deep-prophylaxis': {
    id: 'deep-prophylaxis', level: 6, title: 'Deep Prophylaxis',
    summary: [
      'Deep prophylaxis goes beyond preventing the opponent\'s immediate plan — it involves anticipating plans that are several moves away and making moves NOW that will prevent threats from becoming relevant later. Karpov was the acknowledged master: he would make a quiet move that seemed meaningless until ten moves later you realized it had prevented Black\'s only counterplay.',
      'Deep prophylaxis requires thinking structurally. Instead of asking "what does my opponent threaten?" (shallow), ask "what does my opponent WANT in this type of position?" If you understand their long-term strategic goal, you can stop it before they even begin. This is powerful because prophylactic moves cost one tempo while undoing them costs the opponent many moves.',
      'The practical challenge is that deeply prophylactic moves look passive and are hard to find — they create no immediate threats, improve no piece dramatically, and seem like nothing is happening. Trusting these moves requires confidence in your positional assessment and the discipline to make quiet moves when your intuition says the danger is real.'
    ],
    examples: [
      {
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/R3KB1R w KQ - 0 1',
        orientation: 'white',
        caption: 'The Sicilian Dragon. White plays Kb1 (king from e1 to c1 to b1) — a deeply prophylactic move. It removes the king from any ...Qa5 checks, prevents back-rank tricks after the h-file opens, and allows the a1 rook to join the attack. One quiet king move prevents five future tactical problems.'
      },
      {
        fen: 'r4rk1/pp1nqppp/2pbpn2/3p4/2PP4/2NBPN2/PP2QPPP/R1B2RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White plays a2-a3 — seemingly pointless. But it prevents ...Nb4 (which would hit the Bd3 and disrupt White\'s queenside), prepares b2-b4 expansion, and removes any ...Ba3 tricks. One quiet pawn move secures the entire queenside and enables White\'s plan without interruption. This is Karpovian prophylaxis.'
      }
    ],
    exercises: [
      {
        id: 'mg-dp-01',
        fen: 'r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R w - - 0 1',
        moves: ['c1b1', 'a7a5']
      },
      {
        id: 'mg-dp-02',
        fen: 'r4rk1/pp1nqppp/2pbpn2/3p4/2PP4/2NBPN2/PP2QPPP/R1B2RK1 w - - 0 1',
        moves: ['a2a3', 'e6e5']
      },
      {
        id: 'mg-dp-03',
        fen: 'r1bq1rk1/ppp2ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1',
        moves: ['h2h3', 'a7a6']
      }
    ]
  },

  'initiative-tempo': {
    id: 'initiative-tempo', level: 6, title: 'Initiative and Tempo',
    summary: [
      'The initiative belongs to the player making threats and forcing the opponent to respond. Every move spent REACTING is a move you can\'t spend improving your position. Keeping the initiative — making threats faster than the opponent can counter them — is the defining characteristic of dynamic play at the master level.',
      'Tempo is the currency of the initiative. Gaining a tempo means making a move that forces an opponent\'s response while accomplishing something useful. Losing a tempo means making a move the opponent can ignore. A single tempo advantage in the opening can mean a decisive advantage in the middlegame.',
      'The decision of when to initiate versus when to consolidate is one of chess\'s deepest skills. The initiative MUST be maintained through concrete threats — it cannot be held passively. Once your threats stop being threatening, the initiative passes to the opponent. This is why players with the initiative often sacrifice material: giving back a pawn to maintain the flow of threats is better than stopping and losing momentum.'
    ],
    examples: [
      {
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 0 4',
        orientation: 'white',
        caption: 'The Evans Gambit: White plays b4!? sacrificing a pawn for tempo. After ...Bxb4 c3, White gains another tempo as the bishop moves again. White then plays d4 with another tempo (attacking the bishop). Three tempi gained for one pawn — the initiative is overwhelming. This is how tempi translate into attack.'
      },
      {
        fen: 'r1b1kbnr/pppp1ppp/2n5/4p2q/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
        orientation: 'white',
        caption: 'The Scholars\' Mate attempt (Qh5) gives Black\'s queen an active square but costs tempi. White can gain the initiative by developing with tempo: Nc3 (developing), d3 (developing), and then Nf3 (threatening the queen). Each developing move with a threat = a tempo gained. The initiative shifts to White.'
      }
    ],
    exercises: [
      {
        id: 'mg-it-01',
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 0 4',
        moves: ['d2d4', 'e5d4']
      },
      {
        id: 'mg-it-02',
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',
        moves: ['d2d4', 'e5d4']
      },
      {
        id: 'mg-it-03',
        fen: 'r1bqk2r/ppppbppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 5',
        moves: ['d4d5', 'c6b8']
      }
    ]
  },

  'long-term-sac': {
    id: 'long-term-sac', level: 6, title: 'Long-Term Piece Sacrifice for Initiative',
    summary: [
      'The most spectacular sacrifices in chess are those where material is given up not for an immediate forced win, but for a long-term initiative that converts into a decisive advantage over many moves. The compensation is not a concrete forcing sequence — it is the INABILITY of the defending side to consolidate.',
      'The classic form is the "eternal attack" — a sacrifice that generates permanent pressure the opponent cannot extinguish. The defending side tries to organize but every move is forced, every tempo is spent defending, and gradually the initiative translates into concrete gains. The key insight: the attacker has calculated that the opponent CANNOT consolidate even with best play.',
      'Long-term sacrifices require the highest level of judgment. The practical approach: calculate the immediate consequences, identify the key defensive resources, and verify you have an answer to each one. If the opponent must defend for twenty moves without creating counterplay, the sacrifice is correct — even if no computer can prove it from the starting position.'
    ],
    examples: [
      {
        fen: 'r1bq1rk1/pp2npbp/2n3p1/2ppP3/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White considers d4xc5, sacrificing the central tension for an open d-file and targets on d5. But the deeper sacrifice is Nd5!? — after ...Nxd5 exd5, White has a passed d-pawn and complete control of the center. Black\'s pieces are cramped and the d5 pawn supported by pieces becomes a monster. The sacrifice opens lines and creates long-term pressure.'
      },
      {
        fen: 'r2qr1k1/pp2bppp/2n1pn2/3pN3/3P4/2N1P3/PP2BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s Ne5 is a dominant piece. The deepest idea: Nxf7!? Kxf7, Bg4! with a long-term attack on the exposed king. White has "only" two pawns for the piece, but Black\'s king is permanently vulnerable and White\'s pieces coordinate perfectly for the attack. The sacrifice creates an initiative that lasts the entire game.'
      }
    ],
    exercises: [
      {
        id: 'mg-ls-01',
        fen: 'r2qr1k1/pp2bppp/2n1pn2/3pN3/3P4/2N1P3/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['e5f7', 'g8f7']
      },
      {
        id: 'mg-ls-02',
        fen: 'r1bq1rk1/pp2npbp/2n3p1/2ppP3/3P4/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['c3d5', 'e7d5']
      },
      {
        id: 'mg-ls-03',
        fen: 'r1bqk2r/pppp1ppp/2n2n2/2b1N3/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 0 4',
        moves: ['e5f7', 'g8f7']
      }
    ]
  },

  'steering-endgames': {
    id: 'steering-endgames', level: 6, title: 'Steering Toward Winning Endgames',
    summary: [
      'The ability to recognize from the middlegame that a specific endgame is technically won — and then steer the game toward it — is a hallmark of master-level play. It requires deep endgame knowledge (knowing WHICH endgames are won), middlegame technique (knowing HOW to steer), and positional judgment (reaching the endgame with the right configuration).',
      'Common won endgames to steer toward: rook endgame with an extra pawn and active king (often won with Lucena/Philidor technique); bishop vs knight with pawns on both wings (bishop dominates); good bishop vs bad bishop (the good bishop gradually outmaneuvers). The key: trade the pieces not needed for your winning plan while keeping those that serve it.',
      'Steering AWAY from bad endgames is equally important. If you recognize that your rook endgame would be drawn but your middlegame has chances, keep the queens on! If your opponent is trying to reach a drawn endgame, force them to keep pieces that give you winning chances. Knowing which endgame is drawn vs won determines your entire middlegame strategy.'
    ],
    examples: [
      {
        fen: 'r3r1k1/pp2bppp/2p1pn2/3p4/3P4/2N1BN2/PP2BPPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a slightly better bishop (Be3 is active vs Be7 passive). White should steer toward a bishop endgame by trading rooks and knights. After Rxe8 and Nxf6+, a bishop endgame would favor White because Be3 is good (pawns on dark squares) while Be7 is passive. Identify the favorable endgame, then steer toward it.'
      },
      {
        fen: '2r2rk1/pp2bppp/2p1pn2/3p4/3P1B2/2N2N2/PP2BPPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has Bf4 (active) vs Be7 (passive), and both sides have rooks. White should keep the rooks (they enhance the bishop\'s advantage by creating threats on both wings) while trading knights. A bishop + rooks endgame with the better bishop is often technically winning. Choose WHICH pieces to keep, not just whether to simplify.'
      }
    ],
    exercises: [
      {
        id: 'mg-se-01',
        fen: 'r3r1k1/pp2bppp/2p1pn2/3p4/3P4/2N1BN2/PP2BPPP/R4RK1 w - - 0 1',
        moves: ['f3e5', 'f6d7']
      },
      {
        id: 'mg-se-02',
        fen: '2r2rk1/pp2bppp/2p1pn2/3p4/3P1B2/5N2/PP2BPPP/R4RK1 w - - 0 1',
        moves: ['f3e5', 'c8c2']
      },
      {
        id: 'mg-se-03',
        fen: '4r1k1/pp2bppp/2p1p3/3pP3/3P4/4B3/PP2BPPP/4R1K1 w - - 0 1',
        moves: ['e1d1', 'e8d8']
      }
    ]
  },

  'pawn-imbalances': {
    id: 'pawn-imbalances', level: 6, title: 'Subtle Pawn Structure Imbalances',
    summary: [
      'At the master level, the finest positional distinctions come down to subtle pawn structure differences that most players would not notice. A pawn on g3 vs h3; connected vs isolated center pawns; a pawn majority on one wing vs the other. These differences define the entire strategic character of a position for a grandmaster.',
      'The most important subtle imbalances: pawn majorities (more pawns on one flank can create a passed pawn), pawn islands (separate groups of pawns are harder to defend than connected ones), pawn tension (pawns that threaten to capture each other, where the TIMING of the release is critical), and pawn levers (potential captures that restructure the formation).',
      'Mastering pawn structures means knowing the theory of common formations: the Carlsbad structure (minority attack for White), the Benoni (Black plays ...b5, White plays e4-e5), the King\'s Indian (opposing pawn storms), the Sicilian Maroczy Bind (White controls d5). Building this structural knowledge allows you to navigate by template — knowing what to aim for long before you reach it.'
    ],
    examples: [
      {
        fen: 'r3r1k1/pp3ppp/2p1pn2/3p4/3P4/2P1PN2/PP3PPP/R3R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'The Carlsbad structure (from the Exchange QGD). White has a queenside pawn majority (a2, b2, c3 vs a7, b7, c6). White\'s plan: advance the majority with b2-b4-b5 (minority attack paradoxically uses the majority to create a target). Black must find kingside counterplay. This structure defines the entire strategic battle.'
      },
      {
        fen: 'r1bq1rk1/pp1n1ppp/4pn2/2pP4/2P5/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'The Benoni pawn structure. White has a queenside space advantage (c4+d5 vs Black\'s c5). Black has a kingside pawn majority (e6+f7+g7+h7 vs White\'s e2+f2+g2+h2 — but the d5 pawn is passed!). The pawn imbalance defines the game: White attacks queenside, Black attacks kingside, and the d5 pawn is the fulcrum.'
      }
    ],
    exercises: [
      {
        id: 'mg-pi-01',
        fen: 'r3r1k1/pp3ppp/2p1pn2/3p4/3P4/2P1PN2/PP3PPP/R3R1K1 w - - 0 1',
        moves: ['b2b4', 'a7a6']
      },
      {
        id: 'mg-pi-02',
        fen: 'r1bq1rk1/pp1n1ppp/4pn2/2pP4/2P5/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 1',
        moves: ['a2a4', 'a7a6']
      },
      {
        id: 'mg-pi-03',
        fen: 'r4rk1/pp2ppbp/2np2p1/q7/2PPP3/2N5/PP1QBPPP/R4RK1 w - - 0 1',
        moves: ['d4d5', 'c6e5']
      }
    ]
  },

  'squeeze-zugzwang': {
    id: 'squeeze-zugzwang', level: 6, title: 'Squeeze & Zugzwang',
    summary: [
      'The squeeze is one of chess\'s most elegant techniques: gradually restricting the opponent\'s pieces until they have no useful moves left, at which point being forced to move (zugzwang) causes their position to collapse. It\'s the chess equivalent of slowly tightening a noose — the opponent watches helplessly as their options disappear one by one.',
      'Zugzwang (German for "compulsion to move") occurs when any move a player makes worsens their position, but they MUST move because passing is not allowed. In the endgame, zugzwang is common — king and pawn endings often hinge on who is forced to move. In the middlegame, it\'s rarer but devastating when achieved: every move the opponent makes creates a new weakness.',
      'The squeeze technique requires patience and precision. First, secure your own position completely — make sure YOU have reserve moves (pawn moves you can make without damaging your structure). Then, slowly improve your pieces to their optimal squares, cutting off the opponent\'s options. Eventually the opponent runs out of non-damaging moves and their position cracks. Karpov was the supreme practitioner — his opponents would resign in positions where nothing appeared to be happening, because they realized every move made things worse.'
    ],
    examples: [
      {
        fen: '5k2/6pp/4p3/3pP3/1p1P4/1P4PP/5K2/8 w - - 0 1',
        orientation: 'white',
        caption: 'A classic endgame squeeze. Black\'s king is confined to f8/e8/e7. Black\'s pawns on g7, h7, e6 cannot advance without creating weaknesses. White plays Kf3-e3-f4-g5 to reach the ideal position, then simply waits. Black eventually must push a pawn (...g6 or ...h6), creating a target. This is zugzwang in its purest form.'
      },
      {
        fen: 'r4rk1/p4ppp/1pp1pn2/8/1bBP4/2N1P3/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'A middlegame squeeze position. Black\'s pieces are passive: Bb4 does nothing, Nf6 is tied to defending, and the queenside pawns are fixed. White\'s plan: slowly improve (Bd3, f3, e4) while Black can only shuffle. Eventually Black must make a concession — ...Bxc3 giving up the bishop pair, or ...e5 creating weaknesses. The squeeze is about eliminating ALL good options.'
      }
    ],
    exercises: [
      {
        id: 'mg-sz-01',
        fen: '5k2/6pp/4p3/3pP3/3P4/1p3KPP/8/8 w - - 0 1',
        moves: ['f3e3', 'f8e7']
      },
      {
        id: 'mg-sz-02',
        fen: 'r4rk1/p4ppp/1pp1pn2/8/1bBP4/2N1P3/PP3PPP/R4RK1 w - - 0 1',
        moves: ['c4d3', 'f6d5']
      },
      {
        id: 'mg-sz-03',
        fen: '8/5kpp/4p3/3pP3/3P2P1/7P/5K2/8 w - - 0 1',
        moves: ['f2e3', 'f7e7']
      }
    ]
  }
};
