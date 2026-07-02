// ── Middlegame Study Curriculum ───────────────────────────────────────────────

window.MG_CURRICULUM = [
  { level: 1, label: 'Beginner',     topics: ['piece-activity', 'king-safety', 'center-control', 'trading-pieces'] },
  { level: 2, label: 'Club',         topics: ['weak-squares', 'open-files', 'pawn-structure', 'bishop-vs-knight', 'piece-coordination'] },
  { level: 3, label: 'Intermediate', topics: ['prophylaxis', 'pawn-breaks', 'minority-attack', 'blockade', 'good-bad-bishop'] },
  { level: 4, label: 'Advanced',     topics: ['restricting-opponent', 'favorable-endgames', 'pawn-storm', 'two-bishops', 'rook-seventh', 'imbalances'] },
  { level: 5, label: 'Expert',       topics: ['dynamic-vs-static', 'positional-piece-sac', 'exchange-sacrifice', 'simplification', 'two-weaknesses'] },
  { level: 6, label: 'Master',       topics: ['deep-prophylaxis', 'initiative-tempo', 'long-term-sac', 'steering-endgames', 'pawn-imbalances'] }
];

window.MG_LESSONS = {

  // ── LEVEL 1: BEGINNER ───────────────────────────────────────────────────────

  'piece-activity': {
    id: 'piece-activity', level: 1, title: 'Piece Activity',
    summary: [
      'Active pieces are the engine of middlegame play. A piece is "active" when it controls important squares, participates in threats, or has scope to maneuver freely. A passive piece — one sitting on the back rank behind its own pawns doing nothing — is effectively a handicap even if it hasn\'t been captured.',
      'Every move should be evaluated by asking: does this improve the activity of my pieces? A rook sitting behind your own pawns on a closed file is nearly useless. That same rook placed on an open file, or on the seventh rank attacking enemy pawns, becomes a dominant force.',
      'The concept of piece activity explains why opening gambits work: you sacrifice a pawn to develop quickly and generate immediate pressure. When your opponent\'s pieces are tangled and passive, even a material deficit can be more than compensated by the energy and coordination of your active forces.'
    ],
    examples: [
      {
        fen: 'r5k1/pp3ppp/2n5/3p4/8/2N5/PP3PPP/R5K1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s rook is passive on a1. With no open file to use, it does very little. Compare this to where the rook COULD go — the d-file is semi-open (no White pawn on d). Placing the rook on d1 immediately doubles its influence and pressures Black\'s d5 pawn.'
      },
      {
        fen: 'r4rk1/pp3ppp/3p4/3p4/8/N7/PP3PPP/4R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s knight on a3 is on the rim — a chess proverb says "a knight on the rim is dim." From a3, the knight attacks only b1 and c4. Moving it to c4 dramatically improves its scope: from c4 it attacks a3, a5, b2, b6, d2, d6, e3, and e5 — a much more active piece.'
      }
    ],
    exercises: [
      {
        id: 'mg-pa-01',
        fen: 'r5k1/pp3ppp/2n5/3p4/8/2N5/PP3PPP/R5K1 b - - 0 1',
        moves: ['c6e7', 'a1d1']
      },
      {
        id: 'mg-pa-02',
        fen: 'r4rk1/pp3ppp/3p4/3p4/8/N7/PP3PPP/4R1K1 b - - 0 1',
        moves: ['a8d8', 'a3c4']
      },
      {
        id: 'mg-pa-03',
        fen: '4r1k1/pp3ppp/8/3p4/8/8/PP3PPP/2B3K1 b - - 0 1',
        moves: ['e8e5', 'c1f4']
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
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',
        orientation: 'white',
        caption: 'This is the Italian Game after 1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6. Both sides have developed pieces but neither has castled. White should castle kingside immediately (0-0). The king on e1 is vulnerable to any d-file or e-file opening; after castling to g1 the king is safe behind f2, g2, h2.'
      },
      {
        fen: 'r1bq1rk1/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 w - - 6 5',
        orientation: 'white',
        caption: 'After both sides have castled, the king shelter is intact on both sides (f2/g2/h2 for White, f7/g7/h7 for Black). The middlegame now proceeds based on piece activity and pawn structure — direct king attacks are unlikely unless the pawn shelter is broken. This is the ideal starting point for the middlegame.'
      }
    ],
    exercises: [
      {
        id: 'mg-ks-01',
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 4 4',
        moves: ['f8e7', 'e1g1']
      },
      {
        id: 'mg-ks-02',
        fen: 'r1bqk2r/pppp1ppp/2n2n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 0 7',
        moves: ['d7d6', 'e1g1']
      },
      {
        id: 'mg-ks-03',
        fen: 'r1b1k2r/ppppqppp/2n2n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 2 7',
        moves: ['c6d4', 'e1g1']
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
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2',
        orientation: 'white',
        caption: 'White has played 1.e4 e5 2.d4, immediately fighting for the center. This is a direct challenge: Black must either take (exd4, the Open Game) or decline and allow White a strong center. White\'s two central pawns on e4 and d4 together control a large amount of central territory.'
      },
      {
        fen: 'rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3',
        orientation: 'black',
        caption: 'Black plays the King\'s Indian Defense setup (Nf6, d6). Rather than occupying the center directly, Black allows White\'s pawns on e4 and d4, planning to undermine them later with ...e5 or ...c5. Black controls the center "from behind" — a valid hypermodern strategy that requires precise follow-up.'
      }
    ],
    exercises: [
      {
        id: 'mg-cc-01',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
        moves: ['g8f6', 'd2d4']
      },
      {
        id: 'mg-cc-02',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 2 2',
        moves: ['d7d5', 'e4d5']
      },
      {
        id: 'mg-cc-03',
        fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 4 3',
        moves: ['f6d7', 'd2d4']
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
        fen: '4r1k1/pp3ppp/8/3n4/8/3N4/PP3PPP/4R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'Both sides have a central knight. Black\'s Nd5 is slightly more dominant than White\'s Nd3. However, the key question is: after trading Nxe? or Nxd?, which side benefits more? Here White should consider whether simplifying helps. With balanced material, the answer depends on the resulting pawn structure and whether rooks are active.'
      },
      {
        fen: 'r5k1/pp1b1ppp/3p4/3p4/3P4/2NB4/PP3PPP/R5K1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a light-squared bishop on d3 (active) and Nc3 (active). Black has a dark-squared bishop on d7 (bad — blocked by d5 and d6 pawns). White should avoid trading the active Bd3 or Nc3 for Black\'s passive Bd7. Instead, White should look for ways to exploit Black\'s bad bishop long-term.'
      }
    ],
    exercises: [
      {
        id: 'mg-tp-01',
        fen: '3r2k1/pp4pp/8/8/8/8/PP4PP/R6K b - - 0 1',
        moves: ['d8d1', 'a1d1']
      },
      {
        id: 'mg-tp-02',
        fen: '4r1k1/pp3ppp/8/3n4/3p4/8/PP1B1PPP/4R1K1 b - - 0 1',
        moves: ['e8e1', 'd2e1']
      },
      {
        id: 'mg-tp-03',
        fen: 'r4rk1/pp3ppp/2n5/3p4/8/3N4/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6e5', 'd3e5']
      }
    ]
  },

  // ── LEVEL 2: CLUB ───────────────────────────────────────────────────────────

  'weak-squares': {
    id: 'weak-squares', level: 2, title: 'Weak Squares & Outposts',
    summary: [
      'A weak square is one that can no longer be defended by pawns and can be permanently occupied by an enemy piece. Squares become weak when the pawns that could defend them are advanced, traded away, or blocked. Once a square is weak, the side whose pieces can occupy it gains a long-term advantage.',
      'An outpost is a weak square in enemy territory that is occupied by a piece — most often a knight. A knight on an outpost cannot be driven away by pawns and exerts strong influence over a wide area. Knights on e5, d5, f5, or their equivalents are often the key pieces in a middlegame.',
      'To create outposts, provoke your opponent into making pawn advances that leave holes in their position. After e4 and f4 in the King\'s Indian, Black\'s e5 square becomes a perfect outpost for a White knight — it can never be attacked by the f6, g7, or h6 pawns.'
    ],
    examples: [
      {
        fen: 'r2q1rk1/pp3ppp/2nbpn2/3p4/3P4/2NBPN2/PP3PPP/R2Q1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'A symmetrical structure. The d5 and d4 squares are both potential outposts — strong central squares that can be occupied if the pawns are exchanged or the defending pawns advance. Whoever manages to place a knight on the opponent\'s "d" outpost will gain a meaningful positional edge.'
      },
      {
        fen: 'r2q1rk1/pp3ppp/4pn2/3pN3/3P4/2N5/PP3PPP/R2Q1RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s knight has reached e5 — a powerful outpost. It cannot be attacked by any Black pawn (f6, g6, d6 are all either occupied or would expose Black to other weaknesses). The knight on e5 dominates the center, restricts Black\'s pieces, and gives White a long-term positional advantage.'
      }
    ],
    exercises: [
      {
        id: 'mg-ws-01',
        fen: 'r2q1rk1/pp3ppp/4pn2/3p4/3P4/2N5/PP3PPP/R2Q1RK1 b - - 0 1',
        moves: ['d8c7', 'c3e4']
      },
      {
        id: 'mg-ws-02',
        fen: 'r4rk1/pp3ppp/2n1p3/3p4/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6b4', 'c3e4']
      },
      {
        id: 'mg-ws-03',
        fen: 'r2r2k1/pp3ppp/4p3/3p4/3P4/2N5/PP3PPP/R2R2K1 b - - 0 1',
        moves: ['d8c8', 'c3e4']
      }
    ]
  },

  'open-files': {
    id: 'open-files', level: 2, title: 'Open Files & Rook Placement',
    summary: [
      'An open file is one with no pawns for either side; a half-open file has pawns for only one side. Rooks belong on open files — it is where they exert the most pressure and control. Placing a rook on a closed file (behind your own pawns with nowhere to go) is one of the most common strategic mistakes at club level.',
      'The player who controls an open file gains multiple advantages: the ability to penetrate to the seventh or eighth rank, pressure on enemy pawns that cannot hide, and the option to double rooks for overwhelming control. When there is one open file in the position, both sides race to place a rook there first.',
      'Half-open files are often even more important because they point directly at an enemy pawn. A rook on a half-open file (your side is free, opponent has a pawn) naturally creates long-term pressure. The opponent must either defend the pawn passively or push it forward — both of which create new problems.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Both sides have rooks on the back rank but the e-file is open (no pawns for either side). Both sides should race to put a rook on e1/e8. White to move should play Re1 immediately. Whoever gets there first can use it to penetrate or create threats on the e-file.'
      },
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/2RR2K1 w - - 0 1',
        orientation: 'white',
        caption: 'White has already doubled rooks on the c and d files. Even though there are pawns on d4 and d5, the c-file is open and the d-file is contested. Doubling rooks on an open or semi-open file creates strong pressure — one rook supports the other, and together they can penetrate to the 7th or 8th rank.'
      }
    ],
    exercises: [
      {
        id: 'mg-of-01',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a8e8', 'a1e1']
      },
      {
        id: 'mg-of-02',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/1R3RK1 b - - 0 1',
        moves: ['f8e8', 'b1e1']
      },
      {
        id: 'mg-of-03',
        fen: '5rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/2R3K1 b - - 0 1',
        moves: ['f8c8', 'c1c8']
      }
    ]
  },

  'pawn-structure': {
    id: 'pawn-structure', level: 2, title: 'Pawn Structure',
    summary: [
      'Pawns are the skeleton of a chess position. Unlike pieces, they cannot move backward — every pawn move is permanent. This means pawn structure decisions define the long-term character of the position: which squares are weak, where rooks belong, and which endgames are favorable.',
      'Three pawn weaknesses are especially important to understand: isolated pawns (no neighboring pawns to defend them, must be defended by pieces), doubled pawns (two pawns on the same file, reduced mobility), and backward pawns (cannot be advanced because the squares ahead are controlled, and cannot be protected by neighboring pawns). All three create long-term defensive burdens.',
      'The key principle is: avoid creating pawn weaknesses unless you gain concrete compensation — activity, an open file, an outpost, or material. Pawn structure and piece activity are always connected: a bad pawn structure is a weakness only if the opponent\'s pieces can exploit it. Focus on restricting the opponent\'s pieces rather than attacking the pawn directly.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/8/3p4/3P4/8/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'A symmetric pawn structure. Both d4 and d5 are isolated from their c and e pawns (the c and e pawns don\'t exist). Whoever can attack the opponent\'s isolated pawn while defending their own will gain a long-term advantage. Rooks belong on open files pointing at the isolated pawn.'
      },
      {
        fen: 'r4rk1/pp4pp/5p2/3p4/3P2P1/5P2/PP5P/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a doubled f-pawn (f3 and f2 on the same file is not quite right, but two pawns on f3 and g4 create a weak f4 square). Black\'s pawn on f6 is potentially backward (cannot advance to f5 easily). Both positions have structural weaknesses — the side that activates their pieces better will win.'
      }
    ],
    exercises: [
      {
        id: 'mg-ps-01',
        fen: 'r4rk1/pp3ppp/2n5/8/3P4/8/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6d4', 'a1d1']
      },
      {
        id: 'mg-ps-02',
        fen: 'r4rk1/pp4pp/5p2/3p4/3P4/5N2/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a8d8', 'f3e5']
      },
      {
        id: 'mg-ps-03',
        fen: 'r2r2k1/pp3ppp/8/3p4/3P4/3N4/PP3PPP/R2R2K1 b - - 0 1',
        moves: ['d8d7', 'd1e1']
      }
    ]
  },

  'bishop-vs-knight': {
    id: 'bishop-vs-knight', level: 2, title: 'Bishop vs Knight',
    summary: [
      'Bishops and knights are generally equal in material value, but their effectiveness varies greatly depending on the position. Understanding when one is better than the other is one of the most important positional skills in chess.',
      'Bishops excel in open, spacious positions where they can use their long diagonals. They are especially powerful in endgames with pawns on both sides of the board, where their range allows them to attack on one wing while defending the other. Two bishops together (the "bishop pair") are a formidable weapon — they complement each other, covering both colors.',
      'Knights prefer closed positions with many pawns where their ability to jump over pieces gives them unique access to squares. A knight anchored on a central outpost (e5, d5) surrounded by pawns can be stronger than a bishop. The rule of thumb: open position → bishops are better; closed position → knights are better. Adjust your strategy accordingly — trade your knight for a bishop in open positions, and vice versa.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P2B1/8/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a bishop on g4 vs Black\'s knight on c6. The position is relatively open with pawns on both d4 and d5. In this case, White\'s bishop is at least equal to the knight because it controls the g4-d7 diagonal and can shift to the f1-a6 diagonal quickly. The bishop\'s long-range power is valuable in open positions.'
      },
      {
        fen: 'r4rk1/pp2nppp/3p4/2pP4/2P5/2N5/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Here Black has a knight on e7 and a more closed position (pawns locked on c4/c5 and d5). The knight can maneuver to f5 or d5 — strong outposts. White\'s knight on c3 is also well placed. In this type of closed structure, knights are often better than bishops because they can jump to strong squares that pawns cannot reach.'
      }
    ],
    exercises: [
      {
        id: 'mg-bk-01',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/5B2/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a8e8', 'f3d5']
      },
      {
        id: 'mg-bk-02',
        fen: 'r4rk1/pp3ppp/8/3n4/3P4/2B5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['d5f4', 'c3f6']
      },
      {
        id: 'mg-bk-03',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2B5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6e7', 'c3f6']
      }
    ]
  },

  'piece-coordination': {
    id: 'piece-coordination', level: 2, title: 'Piece Coordination',
    summary: [
      'Individual pieces in chess are strong, but pieces working together as a team are far more powerful than their individual values suggest. Piece coordination means arranging your pieces so they support each other, protect their weaknesses, and combine to attack targets that no single piece could handle alone.',
      'The most common coordination failure at club level is having "all the right pieces but in the wrong places." You might have a rook, bishop, and queen — all valuable — but if the rook is on a closed file, the bishop blocks a key diagonal, and the queen is far from the action, they accomplish nothing together. The first step is to give each piece its natural role.',
      'Look for positions where your pieces create threats that reinforce each other. A knight on an outpost is even stronger when a rook supports it from behind. A bishop controlling a long diagonal is most effective when a queen or rook can use the same diagonal. The greatest attacking combinations in chess are almost always built on perfectly coordinated pieces striking from multiple directions simultaneously.'
    ],
    examples: [
      {
        fen: 'r3r1k1/pp3ppp/2n5/3p4/3P4/2NB4/PP3PPP/R3R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s pieces are well-coordinated: Nc3 supports d5 and controls center squares, Bd3 eyes the h7-b1 diagonal and supports the center, Re1 and Ra1 can both become active on open files. Each piece has a clear role and they reinforce each other\'s functions. This is good piece coordination.'
      },
      {
        fen: 'r3r1k1/pp3ppp/8/3p4/3P4/8/PP3PPP/R3R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'Without minor pieces, the rooks need open files to be effective. Here White should coordinate Ra1 and Re1 by doubling them on the e-file (Re1 stays, Ra1 comes to e1 or a rook goes to the c-file). Doubling rooks on the only open file creates maximum pressure on Black\'s position.'
      }
    ],
    exercises: [
      {
        id: 'mg-pc-01',
        fen: 'r3r1k1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R3R1K1 b - - 0 1',
        moves: ['e8e6', 'c3e4']
      },
      {
        id: 'mg-pc-02',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2NB4/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6b4', 'd3e4']
      },
      {
        id: 'mg-pc-03',
        fen: '4r1k1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R3R1K1 b - - 0 1',
        moves: ['c6d4', 'e1e8']
      }
    ]
  },

  // ── LEVEL 3: INTERMEDIATE ───────────────────────────────────────────────────

  'prophylaxis': {
    id: 'prophylaxis', level: 3, title: 'Prophylaxis',
    summary: [
      'Prophylaxis is the art of preventing your opponent\'s plans before they become threats. Rather than reacting to threats after they appear, a prophylactic player asks: "What does my opponent WANT to do next?" and makes a move that stops it. This proactive thinking is what separates club players from advanced players.',
      'Prophylactic moves often look quiet and unimpressive because they don\'t create immediate threats of their own. A simple pawn move, a king retreat, or a rook shift might prevent a deeply dangerous plan. Kasparov once said: "Chess is the art of analysis." Calculating your own threats is only half the task — you must calculate your opponent\'s threats equally deeply.',
      'The hallmark of a prophylactic mindset is always asking "why?" about your opponent\'s last move. Every move changes the position. Ask: "What new possibilities did that create for them?" If you find the answer before they can execute, you can often prevent the plan with a single quiet, powerful move.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N3P1/PP3PP1/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has played g3 — a prophylactic move. Black\'s rooks might try to penetrate via the g-file or h-file after ...g5 and ...g4. By playing g3, White preemptively prevents ...g4 break and fortifies the kingside. The g3 pawn also prepares Bg2 (fianchetto) to strengthen the long diagonal.'
      },
      {
        fen: 'r4rk1/pp3ppp/2n5/1b1p4/3P4/2N1BP2/PP4PP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Black has a bishop on b5 eyeing White\'s Nc3 — Black wants to trade bishop for knight (Bxc3 bxc3) to damage White\'s pawn structure. White\'s prophylactic response: a2-a3! forcing the bishop to retreat or trade. After a3, White has stopped the plan and can continue development normally.'
      }
    ],
    exercises: [
      {
        id: 'mg-pr-01',
        fen: 'r4rk1/pp3ppp/2n5/1b1p4/3P4/2N1B3/PP3PPP/R4RK1 b - - 0 1',
        moves: ['b5c4', 'a2a3']
      },
      {
        id: 'mg-pr-02',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6d4', 'c3e2']
      },
      {
        id: 'mg-pr-03',
        fen: 'r4rk1/1pp2ppp/p1n5/3p4/3P4/2N3P1/PP3PP1/R4RK1 b - - 0 1',
        moves: ['a6a5', 'a2a4']
      }
    ]
  },

  'pawn-breaks': {
    id: 'pawn-breaks', level: 3, title: 'Pawn Breaks',
    summary: [
      'A pawn break is a pawn advance that challenges or disrupts the opponent\'s pawn chain. When the position is locked and neither side can improve their pieces easily, a well-timed pawn break "opens the position" and gives the active side more space and attacking possibilities.',
      'Every pawn structure has natural pawn breaks. In the Sicilian Dragon (Black pawns on d6, e5, White pawns on d4, e4), the natural breaks are ...d5 for Black and f4-f5 for White. In the King\'s Indian (Black d6, e5, White d4, e4), both sides have characteristic breaks that determine the game\'s direction.',
      'Before playing a pawn break, verify: does it open lines for YOUR pieces or your opponent\'s? A break that opens a file in front of your own king is dangerous. A break that opens lines toward the enemy king while keeping your own king safe is often decisive. Timing is also critical — play the break when your pieces are best positioned to exploit it.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp1n1ppp/2ppbn2/4p3/2PPP3/2N1BN2/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s break is d4-d5, closing the center and gaining space. After d5, Black\'s Nd6 is cut off and the c6 square becomes weak. White should prepare d5 by first placing pieces that benefit from the closed center (knight to e4 or f5, bishop to c2 to support the push).'
      },
      {
        fen: 'r4rk1/pp3ppp/2npb3/3Np3/4P3/2N5/PP3PPP/R1B2RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Black is considering the typical break ...f5 to challenge White\'s center. After ...f5, if White takes exf5, Black recaptures and opens the f-file with active rook play. If White doesn\'t take, Black can advance ...f4 and launch a kingside attack. White must be ready to respond correctly.'
      }
    ],
    exercises: [
      {
        id: 'mg-pb-01',
        fen: 'r4rk1/pp3ppp/2n1p3/3p4/3P1P2/2N5/PP4PP/R4RK1 b - - 0 1',
        moves: ['e6e5', 'f4f5']
      },
      {
        id: 'mg-pb-02',
        fen: 'r4rk1/pp2nppp/2pp4/4p3/2PPP3/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6d4', 'd4d5']
      },
      {
        id: 'mg-pb-03',
        fen: 'r1b2rk1/pp3ppp/2np4/2pPp3/4P3/2N2N2/PP3PPP/R1B2RK1 b - - 0 1',
        moves: ['c6b4', 'c3b5']
      }
    ]
  },

  'minority-attack': {
    id: 'minority-attack', level: 3, title: 'Minority Attack',
    summary: [
      'The minority attack is a strategic plan where you advance fewer pawns (the "minority") against a larger number of enemy pawns (the "majority") to create a weakness in the opponent\'s pawn structure. It sounds counterintuitive — why attack with fewer pawns? — but the goal is not to win pawns directly. The goal is to create a permanent isolated or backward pawn as a target.',
      'The classic minority attack occurs in the Exchange Variation of the Queen\'s Gambit. White has pawns on c2 and b2 (two pawns) against Black\'s pawns on c6, b6 (or c6, d5). White advances b4-b5, and after bxc6 or ...bxc5, Black ends up with a weak c6 or c5 pawn that White can target for the rest of the game.',
      'The defending side against a minority attack should try to find active counterplay — typically in the center or on the kingside. Passive defense usually fails because the attacker can take all the time needed to perfect the plan. The defender must create threats that force the attacker to spend tempo defending rather than advancing pawns.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp1b1ppp/2nqpn2/3p4/3P1B2/2NQPN2/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'The typical Queen\'s Gambit Exchange structure. White\'s minority attack plan is b2-b4-b5, targeting Black\'s c6 pawn. Black should respond with active piece play: put a rook on c8, bring the queen to active squares, and prepare ...e5 or ...Ne4 to generate counterplay before White\'s plan succeeds.'
      },
      {
        fen: 'r4rk1/pp1b1ppp/2nqpn2/2Bp4/3P1B2/2NQPN2/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has already advanced to c5. After b2-b4 and eventually b4-b5xc6, Black\'s pawn on c6 (recaptured) or b6 will be isolated. Black\'s best response here is counterplay in the center with ...e5, freeing the position before the pawn weakness can be firmly established.'
      }
    ],
    exercises: [
      {
        id: 'mg-ma-01',
        fen: 'r4rk1/pp1b1ppp/2n1pn2/3p4/3P4/2N1PN2/PP3PPP/R4RK1 b - - 0 1',
        moves: ['d8c7', 'b2b4']
      },
      {
        id: 'mg-ma-02',
        fen: 'r4rk1/pp1b1ppp/2n1pn2/3p4/1P1P4/2N1PN2/P4PPP/R4RK1 b - - 0 1',
        moves: ['a8b8', 'b4b5']
      },
      {
        id: 'mg-ma-03',
        fen: 'r4rk1/1p1b1ppp/p1n1pn2/1P1p4/3P4/2N1PN2/P4PPP/R4RK1 b - - 0 1',
        moves: ['a6b5', 'c3b5']
      }
    ]
  },

  'blockade': {
    id: 'blockade', level: 3, title: 'Blockade',
    summary: [
      'A passed pawn — a pawn with no enemy pawns in front of it or on adjacent files — is a potential queen. The strongest way to neutralize it is the blockade: placing a piece directly in front of it on the square it wants to advance to. The blockading piece stops the pawn from moving and often sits on a powerful square as a bonus.',
      'Knights make the best blockaders because they are not diminished by sitting in front of a pawn (unlike bishops and rooks, which need open lines to be effective). A knight blockading a passed d-pawn on d5 also attacks c3, c7, e3, e7, b4, b6, f4, f6 — a very active blockader. Nimzovich called the blockading knight "the perfect fighter against the passed pawn."',
      'To counter the blockade, the side with the passed pawn must try to force the blockader away — either by attacking it with pawns, or by trading it off with another piece, or by creating threats elsewhere that force the blockader to abandon its post. The side blockading must keep the blockader immovable and build other advantages while the pawn is stopped.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/8/3p4/3P4/3N4/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s knight on d3 is perfectly placed to blockade if Black\'s d5 pawn becomes a passed pawn. If the c and e files open, Nd3-d4 would be the ideal blockade square. The knight attacks many squares from d4 and prevents the passed pawn from advancing while remaining an active piece.'
      },
      {
        fen: 'r4rk1/pp3ppp/8/3pN3/8/8/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s knight is already blockading on d5 (wait — it\'s on e5 in this FEN). Actually this shows a knight near but not directly blockading. The ideal blockading square for Black\'s d5 pawn would be d4 or d5 itself. Placing the knight on the square directly in front is the key blockade concept.'
      }
    ],
    exercises: [
      {
        id: 'mg-bl-01',
        fen: 'r4rk1/pp3ppp/8/3p4/8/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a8d8', 'c3d5']
      },
      {
        id: 'mg-bl-02',
        fen: 'r4rk1/pp3ppp/8/2np4/8/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c5d3', 'c3d5']
      },
      {
        id: 'mg-bl-03',
        fen: '4r1k1/pp3ppp/8/2np4/8/2N5/PP3PPP/4R1K1 b - - 0 1',
        moves: ['e8d8', 'c3d5']
      }
    ]
  },

  'good-bad-bishop': {
    id: 'good-bad-bishop', level: 3, title: 'Good vs Bad Bishop',
    summary: [
      'A "good bishop" has many of its own pawns on the opposite color to the bishop, leaving the bishop\'s diagonals open and active. A "bad bishop" has most of its own pawns on the same color squares as the bishop, blocking its diagonals and reducing it to a passive defensive role.',
      'A bad bishop is one of the most common long-term disadvantages in chess. If your pawns are fixed on light squares and you have a light-squared bishop, that bishop can do very little — it spends the whole game defending pawns that are already on its own color. Your opponent\'s bishop (or knight) on the other color can roam freely.',
      'To improve a bad bishop, either exchange it for another piece or restructure the pawns. If you have a bad light-squared bishop with pawns stuck on light squares, trade it for the opponent\'s knight (which can reach dark squares that your bishop cannot). Alternatively, "let it out" by opening a diagonal — advance or trade the pawns that block its scope. If neither is possible, the bad bishop is a permanent disadvantage and you should play for positions where it matters less.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp1b1ppp/2pp4/4p3/2P1P3/2PB4/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a "bad" light-squared bishop on d3. White\'s own pawns on c3, c4, e4 are all on light squares, blocking the bishop\'s diagonals completely. The bishop cannot move freely and is reduced to protecting the c3 and e4 pawns passively. This is the classic bad bishop situation.'
      },
      {
        fen: 'r4rk1/pp1b1ppp/2pp4/4p3/2P1P3/2P5/PP1B1PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Compared to the previous diagram, the bishop has been redeployed to d2. It can now use the c1-h6 diagonal. The bishop is still "bad" structurally (own pawns on light squares) but at least it has some scope. The ideal would be to play b4 and c5 to fix Black\'s pawns as targets, then maneuver the bishop to a better diagonal.'
      }
    ],
    exercises: [
      {
        id: 'mg-gb-01',
        fen: 'r4rk1/pp3ppp/2pb4/3p4/3P4/3B4/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6e4', 'd3e4']
      },
      {
        id: 'mg-gb-02',
        fen: 'r4rk1/pp3ppp/3b4/3p4/3P4/3B4/PP3PPP/R4RK1 b - - 0 1',
        moves: ['d6e5', 'd3e2']
      },
      {
        id: 'mg-gb-03',
        fen: 'r4rk1/pp3ppp/8/3pb3/3P4/8/PP1B1PPP/R4RK1 b - - 0 1',
        moves: ['e5e4', 'd2g5']
      }
    ]
  },

  // ── LEVEL 4: ADVANCED ────────────────────────────────────────────────────────

  'restricting-opponent': {
    id: 'restricting-opponent', level: 4, title: 'Restricting the Opponent',
    summary: [
      'Restriction is the strategy of limiting your opponent\'s piece mobility and options until their position becomes passive and suffocated. Rather than attacking directly, you maneuver your pieces to take away all good squares, close critical lines, and leave the opponent with only bad moves.',
      'The classic tool of restriction is space. By maintaining a large pawn center (e5 and d5, or e4 and d4 with f4 added), you squeeze the opponent into a small area where their pieces interfere with each other. Nimzovich described this as "the strategy of the boa constrictor" — you tighten the coil gradually until the opponent cannot breathe.',
      'Restriction also applies to individual pieces. If you can permanently keep the opponent\'s bishop off an important diagonal, or prevent their rook from reaching an open file, you have effectively removed a piece from the game. Look for moves that accomplish this quietly without attacking anything directly — often the opponent will not notice the restriction until it is complete.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2npb3/3Np3/4P3/2N3P1/PP3PP1/R1B2RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s knight on d5 is a powerful restricting piece. It prevents Black from playing ...c6 (to challenge the knight), it blocks the d-file, and it eyes c7 and b6 — squares Black must defend. The knight on d5 "restricts" Black\'s entire queenside while White prepares an attack.'
      },
      {
        fen: 'r4rk1/pp2pppp/2n5/3P4/8/2N3P1/PP3PP1/R1B2RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s d5 pawn creates a space advantage and restricts Black\'s c6 knight (it cannot advance past d5). The pawn on d5 also limits Black\'s dark-squared bishop (d6 is occupied by the pawn). Restricting pawns that close lines and limit piece mobility are a key tool of advanced strategy.'
      }
    ],
    exercises: [
      {
        id: 'mg-ro-01',
        fen: 'r4rk1/pp3ppp/2n1b3/3p4/3P4/2N5/PP3PPP/R1B2RK1 b - - 0 1',
        moves: ['c6d4', 'c3b5']
      },
      {
        id: 'mg-ro-02',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N3P1/PP3PP1/R4RK1 b - - 0 1',
        moves: ['c6e7', 'c3e4']
      },
      {
        id: 'mg-ro-03',
        fen: 'r4rk1/1p3ppp/p1n5/3p4/3P4/2N3P1/PP3PP1/R4RK1 b - - 0 1',
        moves: ['a6a5', 'c3d5']
      }
    ]
  },

  'favorable-endgames': {
    id: 'favorable-endgames', level: 4, title: 'Exchanging into Favorable Endgames',
    summary: [
      'One of the most powerful weapons in chess is the ability to steer the game toward an endgame that is structurally won for you. This means recognizing which endgame is favorable given the current pawn structure and piece imbalances, then trading pieces until you reach it.',
      'The classic example: you have a bishop and your opponent has a knight. The position has pawns on both wings. You should trade all the other pieces — rooks, queens — to reach a bishop vs knight ending where the bishop\'s long range is decisive. Your opponent, recognizing this, might refuse the trades. This forces them into a passive stance defending against a plan they cannot prevent.',
      'Favorable endgame thinking is a form of positional planning: "If I can reach position X, I win. Therefore, I will execute all trades that lead toward X." This is more reliable than tactical complications because endgame advantages are permanent — once you have a better pawn structure and king position, the win is often a matter of technique rather than luck.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2NB4/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a bishop and is considering entering an endgame. If pieces are traded off leaving bishops of opposite colors, it might be a draw. But if rooks stay on and White\'s bishop ends up with pawns on BOTH wings, the bishop\'s long-range mobility gives White winning chances that the knight cannot match.'
      },
      {
        fen: 'r4rk1/pp3ppp/2nb4/3p4/3P4/2NB4/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Here both sides have a bishop. The key question: which bishop is better? White\'s bishop on d3 is active (long diagonal). Black\'s bishop on c6 is somewhat blocked by d5. If White can maneuver to trade the ROOKS (keeping the bishops), the resulting bishop endgame may favor White with Black\'s passive bishop.'
      }
    ],
    exercises: [
      {
        id: 'mg-fe-01',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2NB4/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a8d8', 'd3h7']
      },
      {
        id: 'mg-fe-02',
        fen: '4r1k1/pp3ppp/2n5/3p4/3P4/2NB4/PP3PPP/4R1K1 b - - 0 1',
        moves: ['e8e1', 'c3e1']
      },
      {
        id: 'mg-fe-03',
        fen: '6k1/pp3ppp/2n5/3p4/3P4/3B4/PP3PPP/6K1 b - - 0 1',
        moves: ['c6e7', 'd3g6']
      }
    ]
  },

  'pawn-storm': {
    id: 'pawn-storm', level: 4, title: 'Pawn Storm',
    summary: [
      'A pawn storm is the aggressive advance of multiple pawns toward the enemy king, with the goal of tearing open the pawn shelter and exposing the king to attack. It is the most direct attacking weapon in chess and is typically used when the kings have castled on opposite sides.',
      'The key prerequisite for a pawn storm is that YOUR king is safe while you attack. If both kings are on the same side, advancing the pawns in front of your own king opens lines toward your own position. Opposite-side castling changes this — if your king is on the queenside and opponent\'s king is on the kingside, advancing your h, g, f pawns attacks the opponent without risk to yourself.',
      'The pawn storm must be timed correctly. First ensure your pieces are coordinated and ready to follow up. A pawn storm that opens lines before your pieces are active backfires. The ideal sequence: castle on the side away from the opponent, coordinate your pieces, THEN launch the pawn avalanche knowing your pieces are ready to pour through the opened lines.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N3PP/PP3P2/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has played g2-g3 and h2-h3 as preparation for h4-h5. This is the early preparation of a kingside pawn storm. The plan: h4, g4, h5, g5, opening lines against Black\'s king on g8. The storm must be supported by pieces — a rook on f1 ready to come to g1, and pieces on the kingside.'
      },
      {
        fen: 'r4r1k/pp3ppp/2n5/3p4/3P2P1/2N4P/PP3P2/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has launched the g4-g5 storm. Black\'s king is on h8 and the h7/g7 pawns are under pressure. If White continues h4 and g5 (pushing again), Black\'s position on the kingside will crack. Note White\'s own king is safe on g1 — the storm only affects Black\'s side.'
      }
    ],
    exercises: [
      {
        id: 'mg-pstorm-01',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a8e8', 'g2g4']
      },
      {
        id: 'mg-pstorm-02',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P2P1/2N5/PP3PP1/R4RK1 b - - 0 1',
        moves: ['h7h6', 'g4g5']
      },
      {
        id: 'mg-pstorm-03',
        fen: 'r4rk1/pp3p1p/2n3p1/3p4/3P2P1/2N4P/PP3P2/R4RK1 b - - 0 1',
        moves: ['g6g5', 'h3h4']
      }
    ]
  },

  'two-bishops': {
    id: 'two-bishops', level: 4, title: 'The Two Bishops Advantage',
    summary: [
      'Having both bishops (one light-squared, one dark-squared) while your opponent has a bishop and knight, or two knights, gives you what is called the "bishop pair advantage." The two bishops complement each other — together they cover all 64 squares, control both colors simultaneously, and support each other\'s plans.',
      'The bishop pair is especially strong in open positions. In the endgame, two bishops vs bishop and knight often leads to a technically won endgame for the bishop pair — the two bishops can create mating threats and zugzwang situations that a knight cannot match. Grandmasters treat obtaining the bishop pair as a significant positional achievement.',
      'To exploit the bishop pair, OPEN THE POSITION. Advance pawns to open diagonals for your bishops. Exchange pawns that block your bishops\' diagonals. Avoid returning to a symmetrical pawn structure that might give the opponent\'s knight an outpost. The bishop pair is strongest when the position is fluid, open, and the pawns are mobile — not in locked pawn structures where a knight on an outpost can be superior.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/3B4/PP1B1PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has the bishop pair (Bd3 and Bd2). Black has only a knight on c6. White should open the position: play e4 to challenge d5 and open the d3 bishop\'s diagonal, and avoid trading either bishop. The long-term aim is an endgame where the two bishops dominate the knight in an open position.'
      },
      {
        fen: 'r4rk1/pp3ppp/8/3p4/3P4/3B4/PP1B1PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'With no knights remaining, White\'s bishop pair vs Black\'s lone bishop (hypothetical) is very strong. The two bishops together can attack both wings, creating threats on both the light and dark diagonals simultaneously. Black\'s single bishop cannot defend everywhere.'
      }
    ],
    exercises: [
      {
        id: 'mg-tb-01',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/3B4/PP1B1PPP/R4RK1 b - - 0 1',
        moves: ['a8e8', 'e2e4']
      },
      {
        id: 'mg-tb-02',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3Pp3/3B4/PP1B1PPP/R4RK1 b - - 0 1',
        moves: ['c6d4', 'd3e4']
      },
      {
        id: 'mg-tb-03',
        fen: 'r4rk1/pp3ppp/8/3p4/3P4/3B4/PP1B1PPP/R4RK1 b - - 0 1',
        moves: ['a8d8', 'd3h7']
      }
    ]
  },

  'rook-seventh': {
    id: 'rook-seventh', level: 4, title: 'Rook on the Seventh Rank',
    summary: [
      'A rook on the seventh rank (White) or second rank (Black) is one of the most powerful piece placements in chess. From the seventh rank, a rook attacks all the enemy pawns that have not advanced, restricts the enemy king to the back rank, and can often create devastating back-rank threats.',
      'Two rooks on the seventh rank together are almost always decisive — they are often called "pig rooks" or "pigs on the seventh" because they devour pawns. Even a single rook on the seventh can be worth a pawn or more in practical terms if it ties down the opponent\'s pieces to passive defense.',
      'To exploit a rook on the seventh, combine it with a threat on the back rank (if the king has no escape), or advance passed pawns while the rook ties down the enemy pieces. The defending side should try to get their own rook active to attack your pawns from the side, force the rook off the seventh by trading or driving it away, or give the king an escape square to remove the back-rank threat.'
    ],
    examples: [
      {
        fen: '4r1k1/pp1R1ppp/8/8/8/8/PP3PPP/6K1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s rook is already on the seventh rank (d7). It attacks b7, c7 (empty), f7, g7, h7 — five pawns from one square! Black\'s pawns on a7, b7, f7, g7, h7 are all vulnerable. The king on g8 is also restricted. White can pick off pawns at leisure while Black can only sit and suffer.'
      },
      {
        fen: '3r2k1/pp3Rpp/8/8/8/8/PP3PPP/6K1 w - - 0 1',
        orientation: 'white',
        caption: 'Both rooks on the seventh: if White doubled rooks here (imagine Rd7 joining Rf7), the position would be completely won. But even one rook on f7 attacks h7, g7, and e7. Combined with passed pawns or a back-rank threat, one rook on the seventh is often enough to win.'
      }
    ],
    exercises: [
      {
        id: 'mg-r7-01',
        fen: '4r1k1/pp3ppp/8/8/8/8/PP3PPP/4R1K1 b - - 0 1',
        moves: ['e8e2', 'e1e2']
      },
      {
        id: 'mg-r7-02',
        fen: '4r1k1/pp3ppp/8/8/8/8/PP3PPP/R5K1 b - - 0 1',
        moves: ['a8a2', 'a1a2']
      },
      {
        id: 'mg-r7-03',
        fen: '6k1/pp3ppp/8/8/8/8/PP3PPP/R5K1 b - - 0 1',
        moves: ['g8h8', 'a1a7']
      }
    ]
  },

  'imbalances': {
    id: 'imbalances', level: 4, title: 'Creating and Exploiting Imbalances',
    summary: [
      'Every chess position contains imbalances — factors that make one side\'s position different from (and possibly better than) the other\'s. Common imbalances include: better piece activity, superior pawn structure, the bishop pair, a space advantage, a lead in development, or a strong passed pawn. Recognizing which imbalances exist in a position tells you what plan to pursue.',
      'Rather than playing random moves or hoping for tactical opportunities, strong players identify their key imbalance and make a plan to maximize it. If you have the bishop pair, open the position. If you have a space advantage, prevent the opponent from creating counterplay. If you have a better-developed position, open the game before the opponent completes development.',
      'The most important skill is knowing which imbalance to CREATE. Before trading pieces, ask: does this trade give me a favorable imbalance? If you exchange your knight for a bishop but end up in a closed position, the trade was bad. Creating imbalances means deliberately steering the game toward a type of position that suits YOUR pieces better than the opponent\'s.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P2B1/2N5/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'The key imbalance here: White has a bishop on g4, Black has a knight on c6. In an open position (as this is), the bishop is slightly better. White\'s plan: open the position further (possibly e4 or f4 later) to maximize the bishop\'s scope. Black\'s plan: close the position to give the knight more relative value.'
      },
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N3P1/PP3PP1/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a space advantage on the kingside with g3 and potential f4. Black has a space advantage on the queenside. Each side should attack on the wing where they have space. This is a classic imbalanced position — not symmetric, so the evaluation depends on who executes their plan faster.'
      }
    ],
    exercises: [
      {
        id: 'mg-im-01',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6e7', 'c3d5']
      },
      {
        id: 'mg-im-02',
        fen: 'r4rk1/pp3ppp/8/2np4/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c5d3', 'c3d5']
      },
      {
        id: 'mg-im-03',
        fen: 'r4rk1/pp3ppp/8/3p4/3P2n1/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['g4f2', 'g1f2']
      }
    ]
  },

  // ── LEVEL 5: EXPERT ─────────────────────────────────────────────────────────

  'dynamic-vs-static': {
    id: 'dynamic-vs-static', level: 5, title: 'Dynamic vs Static Advantages',
    summary: [
      'Positional advantages come in two types: static (permanent features like pawn structure weaknesses, bishop vs knight in certain structures) and dynamic (temporary but energetic features like development lead, open lines, piece activity, a sacrificial attack). Understanding which type you have determines how urgently you must act.',
      'Dynamic advantages MUST be exploited immediately. If you\'re ahead in development, you must open the position NOW — every move of delay gives the opponent time to catch up. If you have a temporary initiative, you must maintain the pressure — if the opponent gets even one free move to consolidate, your advantage evaporates. Dynamic play is all about tempo.',
      'Static advantages can be exploited slowly. A bad bishop, an isolated pawn, a permanent weak square — these advantages will still be there in twenty moves. Take your time to improve your pieces, create secondary threats, and improve your overall position before "cashing in." Rushing a static advantage often loses it; exploiting it patiently turns it into a win.'
    ],
    examples: [
      {
        fen: 'r3r1k1/pp3ppp/2n5/3p4/3P4/2N3P1/PP3PP1/R3R1K1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s doubled rooks on the e-file create a DYNAMIC advantage — they exert pressure on e7 and the entire e-file. But this is temporary because Black can play ...Re7 and ...Rae8 to neutralize it. White must use the dynamic pressure NOW, either by penetrating to e7 or forcing concessions before Black reorganizes.'
      },
      {
        fen: 'r4rk1/pp1b1ppp/2np4/3p4/3P4/2N3P1/PP1B1PP1/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s bishop on d2 is "bad" (own pawns on d4, potentially c3 and e3 blocking its diagonals). This is a STATIC disadvantage — it will still be bad in 20 moves. Black should not rush to exploit it; instead improve all pieces gradually and create a plan that slowly makes White\'s bad bishop a decisive weakness.'
      }
    ],
    exercises: [
      {
        id: 'mg-ds-01',
        fen: 'r3r1k1/pp3ppp/2n5/3p4/3P4/2N3P1/PP3PP1/R3R1K1 b - - 0 1',
        moves: ['c6d4', 'e1e7']
      },
      {
        id: 'mg-ds-02',
        fen: '4r1k1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/4R1K1 b - - 0 1',
        moves: ['e8e1', 'c3d5']
      },
      {
        id: 'mg-ds-03',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N3P1/PP3PP1/1R3RK1 b - - 0 1',
        moves: ['c6b4', 'b1b7']
      }
    ]
  },

  'positional-piece-sac': {
    id: 'positional-piece-sac', level: 5, title: 'Positional Piece Sacrifice',
    summary: [
      'A positional piece sacrifice gives up material — typically a minor piece for two or three pawns, or a piece for a powerful long-term structural advantage — without an immediate forcing sequence to win the material back. Unlike tactical combinations, the compensation is long-term and positional rather than immediate and forced.',
      'The most famous positional sacrifices involve giving a knight or bishop to: destroy the opponent\'s pawn shelter, create a passed pawn, gain a dominant square or outpost, or eliminate the opponent\'s key defensive piece. The player making the sacrifice accepts a material deficit and trusts that the positional gains will prove decisive over the course of many moves.',
      'Positional sacrifices require extremely accurate positional judgment — the ability to evaluate whether the long-term compensation is sufficient. At the club level, most sacrifices should be backed by concrete calculation. At the master level, feel and intuition based on experience can guide sacrifices that computers might evaluate as slightly incorrect but that prove winning in practice because the resulting positions are so difficult to defend.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3pN3/3P4/8/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a knight on e5 — a powerful outpost. If Black plays ...f6 to kick the knight, White might sacrifice: Nxf7!? — giving the knight for pawn and structural gains. After Kxf7, White has two pawns for the piece but more importantly, Black\'s king is exposed and the f6 pawn would be gone, opening the f-file for White\'s rook.'
      },
      {
        fen: 'r4rk1/pp3ppp/2npb3/3N4/3P4/8/PP3PPP/R1B2RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White considers Nxe7+ (knight sacrifice). After Nxe7 Qxe7 (forced), White has a pawn for the piece but has eliminated Black\'s dark-squared bishop — a key defensive piece. With Black\'s bishop gone, White\'s remaining bishop on c1 (or wherever) now has free rein on the dark squares. The positional compensation may be sufficient.'
      }
    ],
    exercises: [
      {
        id: 'mg-pps-01',
        fen: 'r4rk1/pp3ppp/2n5/3pN3/3P4/8/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6d4', 'e5f7']
      },
      {
        id: 'mg-pps-02',
        fen: 'r4rk1/pp3ppp/5n2/3pN3/3P4/8/PP3PPP/R4RK1 b - - 0 1',
        moves: ['f6d5', 'e5g6']
      },
      {
        id: 'mg-pps-03',
        fen: 'r2r2k1/pp3ppp/2n5/3pN3/3P4/8/PP3PPP/R4RK1 b - - 0 1',
        moves: ['d8d5', 'e5f7']
      }
    ]
  },

  'exchange-sacrifice': {
    id: 'exchange-sacrifice', level: 5, title: 'Positional Exchange Sacrifice',
    summary: [
      'Giving up a rook for a bishop or knight (the "exchange") is a material deficit — but sometimes the positional gains make it entirely worthwhile. The exchange sacrifice is one of the most sophisticated weapons in chess, requiring deep positional understanding to evaluate correctly.',
      'The classic exchange sacrifice occurs when a rook is sacrificed to place a piece on a dominant outpost, or to destroy a key defensive piece. Tal made exchange sacrifices famous with sacrifices that gave him initiative and attacking compensation. Petrosian used exchange sacrifices as a defensive tool — "giving up the exchange to avoid a worse fate."',
      'When considering an exchange sacrifice, ask: what do I gain? Typically: a powerful piece on an outpost (rook for knight on e5 might give you a permanent dominant piece), structural advantages (rook for bishop that was blocking a passed pawn), or the initiative (active piece play that compensates for the material deficit). Exchange sacrifices are especially effective when the opponent\'s rooks have no open files — then the material advantage is theoretical rather than practical.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3pN3/3P4/8/PP3PPP/R1R3K1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s knight on e5 is a dominant piece. If Black plays ...Rxe5! (sacrificing the exchange), Black gives rook for knight to REMOVE this dominant knight. After dxe5, Black has rook and pawn for two rooks (or rook and piece), and the e5 outpost no longer exists. Sometimes sacrificing the exchange is the only way to neutralize a dominant piece.'
      },
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/8/PP3PPP/R1R3K1 w - - 0 1',
        orientation: 'white',
        caption: 'White has doubled rooks on the c-file. If Black sacrifices Rxc1 to trade one pair of rooks, Black is giving rook for rook (equal). But if Black sacrifices Rxc1 when the position calls for it to activate the remaining rook, that\'s a positional exchange sacrifice — giving one exchange to make the remaining pieces maximally active.'
      }
    ],
    exercises: [
      {
        id: 'mg-es-01',
        fen: 'r4rk1/pp3ppp/2n5/3pN3/3P4/8/PP3PPP/R4RK1 b - - 0 1',
        moves: ['f8e8', 'e5f7']
      },
      {
        id: 'mg-es-02',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/3N4/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a8d8', 'd3f4']
      },
      {
        id: 'mg-es-03',
        fen: '2r3k1/pp3ppp/2n5/3p4/3P4/3N4/PP3PPP/2R3K1 b - - 0 1',
        moves: ['c8c1', 'c1d1']
      }
    ]
  },

  'simplification': {
    id: 'simplification', level: 5, title: 'Simplification — Converting a Won Game',
    summary: [
      'One of the most difficult skills in chess is converting a won position into an actual win. Many players have outplayed their opponent positionally — reached a clearly better or even decisive position — only to let the win slip through complications or time trouble. The antidote is simplification: trading off pieces to reach a won endgame.',
      'When you are ahead in material, trade queens and rooks first. Queens create the most tactical danger for the defending side; removing them takes away counterplay. Every piece traded moves you closer to an endgame where your extra material is clearly decisive. Avoid unnecessary complications — accept equal trades even if you think you can "do better."',
      'The formula for simplification: identify your advantage, identify the simplest path that preserves it, and execute patiently. If you have an extra pawn and your opponent has no immediate threats, there is no hurry — improve your king position, advance your pawns, and trade pieces when it maintains your advantage. Never trade pieces in a way that gives your opponent counterplay just to avoid complications.'
    ],
    examples: [
      {
        fen: '4r1k1/pp3ppp/8/8/8/8/PP3PPP/2R3K1 w - - 0 1',
        orientation: 'white',
        caption: 'White is a rook ahead (rc1 vs re8) — a trivially won endgame. The winning technique is to trade rooks (Rxe8 or Rc8 offers a trade), reach a king and pawns vs king and pawns position, and convert with the extra material. Even strong players must know how to execute this conversion technique flawlessly.'
      },
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N3P1/PP3PP1/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'A complex position. If White has a slight structural advantage, the right strategy is often to simplify by trading the knights (Nxc6 bxc6, leaving Black with doubled pawns) and then converting the structural advantage in a rook endgame. The rook endgame is easier to convert than the middlegame with knights where counterplay exists.'
      }
    ],
    exercises: [
      {
        id: 'mg-sim-01',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6d4', 'c3d5']
      },
      {
        id: 'mg-sim-02',
        fen: '4r1k1/pp3ppp/8/3p4/3P4/8/PP3PPP/4R1K1 b - - 0 1',
        moves: ['e8e1', 'e1e1']
      },
      {
        id: 'mg-sim-03',
        fen: 'r4rk1/pp3ppp/8/3p4/3P4/8/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a8e8', 'a1e1']
      }
    ]
  },

  'two-weaknesses': {
    id: 'two-weaknesses', level: 5, title: 'The Principle of Two Weaknesses',
    summary: [
      'One of the most important principles in positional chess is this: a single weakness is often not enough to win. The defending side can concentrate all their pieces to defend one weak pawn or one weak square. But when you create a SECOND weakness, the defender cannot be in two places at once and eventually one weakness will fall.',
      'The technique of two weaknesses works as follows: you first fix one weakness (typically a weak pawn) and threaten it enough to tie down the defender\'s pieces. Then, while their pieces are committed to defending the first weakness, you create a second weakness on the OTHER wing. The defender must now split their forces, and inevitably one weakness becomes indefensible.',
      'This principle is why strong players do not immediately attack a weakness when they find one — first, they ask whether they can create a second weakness as well. Only when both weaknesses exist do they launch the final assault. The most common sequence is: kingside space advantage used to create a weak kingside pawn, then queenside pawn advance to create a second target while defender is tied to the kingside.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp4pp/3p1p2/3Pp3/3P4/2N5/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Black has two potential weaknesses: the f6 pawn and the d6 pawn. Neither alone might be decisive, but together they stretch Black\'s defensive resources. White\'s plan: attack f6 with Nf4 and the rooks via the f-file, then if Black concentrates defense there, advance on the queenside to create a second crisis on d6 or the a/b files.'
      },
      {
        fen: 'r4rk1/p5pp/3p1p2/pp1Pp3/3P4/2N5/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Black has already created a second weakness with ...a5 and ...b5 (queenside pawn advance). Now White has targets on BOTH wings: the kingside pawns (f6, g7) and the queenside pawns (a5, b5) that might become weak. White should use this to overload Black\'s defensive resources.'
      }
    ],
    exercises: [
      {
        id: 'mg-tw-01',
        fen: 'r4rk1/pp4pp/3p1p2/3Pp3/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a8e8', 'c3f5']
      },
      {
        id: 'mg-tw-02',
        fen: 'r4rk1/pp4pp/3p1p2/3Pp3/3P4/5N2/PP3PPP/R4RK1 b - - 0 1',
        moves: ['f8d8', 'f3h4']
      },
      {
        id: 'mg-tw-03',
        fen: 'r4rk1/1p4pp/p2p1p2/3Pp3/3P4/5N2/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a6a5', 'a2a4']
      }
    ]
  },

  // ── LEVEL 6: MASTER ─────────────────────────────────────────────────────────

  'deep-prophylaxis': {
    id: 'deep-prophylaxis', level: 6, title: 'Deep Prophylaxis',
    summary: [
      'Deep prophylaxis moves beyond preventing the opponent\'s immediate plan — it involves anticipating plans that are several moves away, understanding the opponent\'s strategic goals, and making moves NOW that will prevent threats from even becoming relevant in ten moves. Karpov was the acknowledged master of this: he would make a quiet move that seemed meaningless until, ten moves later, you realized it had prevented Black\'s only counterplay.',
      'Deep prophylaxis requires thinking about the game structurally. Instead of asking "what does my opponent threaten?" (shallow), ask "what does my opponent WANT in this type of position?" If you understand their long-term strategic goal, you can stop it before they even begin to execute it. This is especially powerful because prophylactic moves cost only one tempo while undoing them costs the opponent many moves.',
      'The practical challenge is that prophylactic moves look passive and are hard to find — they create no immediate threats, improve no piece dramatically, and seem like nothing is happening. Trusting deeply prophylactic moves requires confidence in your positional assessment and the discipline to make quiet, "boring" moves when your intuition says the danger is real.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N3P1/PP3PP1/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'g2-g3 is a prophylactic move. Black might want to play ...Bg4 to pin White\'s knight or disturb White\'s kingside. By playing g3 first, White prevents this idea completely. The h1-a8 diagonal is also closed, preventing a future ...Bc5 or ...Bb4 from being effective. One quiet pawn move has eliminated multiple future threats.'
      },
      {
        fen: 'r4rk1/1pp2ppp/p1n5/3p4/3P4/2N3PP/PP3P2/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has played h2-h3 and g2-g3 and h3-h4. This looks like attack preparation, but it is also prophylaxis: Black\'s intended ...Ng4 (to h2 or f2) is prevented, ...Bg4 is prevented, and the kingside is solid. Meanwhile White can improve queenside pieces. Deep prophylaxis prepares for threats that haven\'t been "announced" yet.'
      }
    ],
    exercises: [
      {
        id: 'mg-dp-01',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6b4', 'a2a3']
      },
      {
        id: 'mg-dp-02',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6d4', 'c3e2']
      },
      {
        id: 'mg-dp-03',
        fen: 'r4rk1/pp3ppp/2n5/1b1p4/3P4/2N5/PPB2PPP/R4RK1 b - - 0 1',
        moves: ['b5a6', 'c2b3']
      }
    ]
  },

  'initiative-tempo': {
    id: 'initiative-tempo', level: 6, title: 'Initiative and Tempo',
    summary: [
      'The initiative in chess belongs to the player who is making threats and forcing the opponent to respond. Every move you spend REACTING to your opponent\'s threats is a move you cannot spend improving your position. Keeping the initiative — making threats faster than the opponent can counter them — is the defining characteristic of dynamic play at the master level.',
      'Tempo is the currency of the initiative. Gaining a tempo means making a move that forces an opponent\'s response while also accomplishing something useful. Losing a tempo means making a move the opponent can ignore. A single tempo advantage in the opening can mean a decisive advantage in the resulting middlegame.',
      'The decision of when to initiate versus when to consolidate is one of chess\'s deepest skills. The initiative MUST be maintained through concrete threats — it cannot be held passively. Once your threats stop being threatening, the initiative passes to the opponent. This is why players with the initiative often sacrifice material: giving back a pawn or piece to maintain the flow of threats is often better than stopping for a tempo and allowing the opponent to consolidate.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'This is a balanced position. Whoever makes the next move with a concrete threat will gain the initiative. White could play Nf4 threatening Nd5 or Ne6 — a concrete threat that forces Black to respond. The player who makes threats dictates the flow of the game; the player who only responds gradually falls behind.'
      },
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N3P1/PP3PP1/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'After White played g3, if White follows with f4 next, there is a plan: f4-f5 is being prepared. If White instead plays a passive move, Black can seize the initiative with ...c5 or ...Nc4 gaining space. Initiative is like a ratchet: you can turn it forward but you must keep turning or the opponent will reverse it.'
      }
    ],
    exercises: [
      {
        id: 'mg-it-01',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6d4', 'c3e4']
      },
      {
        id: 'mg-it-02',
        fen: 'r4rk1/pp3ppp/5n2/3p4/3P4/2N5/PP3PPP/R4RK1 b - - 0 1',
        moves: ['f6d5', 'c3d5']
      },
      {
        id: 'mg-it-03',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3PN3/8/PP3PPP/R4RK1 b - - 0 1',
        moves: ['c6d4', 'e4d6']
      }
    ]
  },

  'long-term-sac': {
    id: 'long-term-sac', level: 6, title: 'Long-Term Piece Sacrifice for Initiative',
    summary: [
      'The most spectacular and difficult sacrifices in chess are those where material is given up not for an immediate forced win, but for a long-term initiative that gradually converts into a decisive advantage over many moves. These sacrifices are based on deep understanding of piece value beyond material: the value of activity, king safety, and the inability of certain pieces to coordinate against focused pressure.',
      'The classic form is the "eternal attack" — a piece sacrifice that generates a permanent attack that the opponent cannot extinguish. The defending side tries to organize their pieces but every move is forced, every tempo is spent defending, and gradually the initiative translates into concrete material gains or mate. The key is that the attacker has calculated that the opponent CANNOT consolidate, even with best play.',
      'Long-term sacrifices require the highest level of calculation and intuition. The practical approach: calculate the immediate consequences carefully, identify the key defensive resources the opponent has, and verify that you have an answer to each one. Then trust your evaluation. If the opponent must defend for twenty moves without creating counterplay, the sacrifice is objectively correct even if it is hard to prove conclusively at the board.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3pN3/3P4/8/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White\'s knight on e5 is a dominant piece. Sacrificing Nxf7 gives up the knight for a pawn but obtains: Black\'s king is exposed, White\'s rooks get open files, and the dark squares around Black\'s king are vulnerable. Whether this is objectively correct depends on precise calculation, but positionally the long-term initiative may justify the material deficit.'
      },
      {
        fen: 'r2r2k1/pp3ppp/2n5/3pN3/3P4/8/PP3PPP/R2R2K1 w - - 0 1',
        orientation: 'white',
        caption: 'With doubled rooks, White\'s initiative after a piece sacrifice is even more powerful. The rooks can immediately use open files created by the sacrifice. The value of rook penetration to the 7th or 8th rank often exceeds the material value of a minor piece — this is the practical justification for long-term sacrifices with rooks ready to invade.'
      }
    ],
    exercises: [
      {
        id: 'mg-ls-01',
        fen: 'r4rk1/pp3ppp/2n5/3pN3/3P4/8/PP3PPP/R2R2K1 b - - 0 1',
        moves: ['c6d4', 'e5f7']
      },
      {
        id: 'mg-ls-02',
        fen: 'r2r2k1/pp3ppp/2n5/3pN3/3P4/8/PP3PPP/R2R2K1 b - - 0 1',
        moves: ['d8e8', 'e5g6']
      },
      {
        id: 'mg-ls-03',
        fen: 'r4rk1/pp3ppp/2n2n2/3pN3/3P4/8/PP3PPP/R2R2K1 b - - 0 1',
        moves: ['f6d5', 'e5g6']
      }
    ]
  },

  'steering-endgames': {
    id: 'steering-endgames', level: 6, title: 'Steering Toward Winning Endgames',
    summary: [
      'The ability to recognize from the middlegame that a specific endgame is technically won — and then steer the game toward that endgame — is a hallmark of master-level play. It requires deep endgame knowledge (knowing WHICH endgames are won), middlegame technique (knowing HOW to steer toward them), and positional judgment (ensuring you reach the endgame with the right piece configuration).',
      'Common examples of won endgames to steer toward: king and two connected passed pawns vs king (easily won); rook endgame with an extra pawn and active king (often won with correct technique); bishop vs same-color bishop where your bishop is the good one and theirs is bad (potentially won). The key is to trade the pieces that are NOT favorable to you while keeping those that serve your winning plan.',
      'Steering away from bad endgames is equally important. If you have a theoretical draw with correct play but the opponent is trying to steer into a complex endgame where you might go wrong, simplify into a structure you know is drawn. Knowing when an endgame is drawn (and can be held) vs when you must fight in the middlegame is what separates master technique from amateur play.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2NB4/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'White has a bishop while Black has a knight. In an open position with pawns on both wings, White should steer toward an endgame. Trading rooks is often favorable when you have the bishop (long range covers both wings). White should avoid trading the bishop or allowing the knight to reach an outpost in the resulting endgame.'
      },
      {
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2N5/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Without the bishops, knights are generally equal. However, if White can trade one pair of rooks to reach R vs R + N endgame where Black\'s knight is awkward (far from action), and White\'s rook is dominant, White might gradually outmaneuver. Endgame steering often means small improvements over many moves.'
      }
    ],
    exercises: [
      {
        id: 'mg-se-01',
        fen: 'r4rk1/pp3ppp/2n5/3p4/3P4/2NB4/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a8e8', 'a1e1']
      },
      {
        id: 'mg-se-02',
        fen: '4r1k1/pp3ppp/2n5/3p4/3P4/2NB4/PP3PPP/4R1K1 b - - 0 1',
        moves: ['e8e1', 'c3e1']
      },
      {
        id: 'mg-se-03',
        fen: '6k1/pp3ppp/2n5/3p4/3P4/3B4/PP3PPP/6K1 b - - 0 1',
        moves: ['c6e7', 'd3g6']
      }
    ]
  },

  'pawn-imbalances': {
    id: 'pawn-imbalances', level: 6, title: 'Subtle Pawn Structure Imbalances',
    summary: [
      'At the master level, the finest positional distinctions come down to subtle pawn structure differences that most players would not even notice. A pawn on g3 vs h3; connected vs isolated center pawns; a pawn majority on one wing vs the other. These differences, which might seem irrelevant to a beginner, define the entire strategic character of a position for a grandmaster.',
      'The most important subtle imbalances: pawn majorities (more pawns on one flank that can create a passed pawn), pawn islands (separate groups of pawns are harder to defend than connected groups), pawn tension (pawns that threaten to capture each other, where the timing of the release of tension is critical), and pawn levers (potential pawn captures that will dramatically restructure the pawn formation).',
      'Mastering pawn structures means knowing the "theory" of common structures: what plan does White have in the Carlsbad structure? What does Black do in the Minority Attack position? Which pawn breaks are available in the King\'s Indian? Building this structural knowledge allows you to navigate endgames and middlegames by template rather than by calculation — knowing what to aim for long before you reach it.'
    ],
    examples: [
      {
        fen: 'r4rk1/pp3ppp/8/3p4/3P4/8/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Symmetric pawn structure. Both sides have pawns on a, b, g, h, and a central pawn (d4 and d5). The only asymmetry is the tempo (White moves next). In such symmetric positions, the slightest pawn imbalance — like a side with b3 vs b5, or one side having three vs two on one flank — can determine the endgame outcome.'
      },
      {
        fen: 'r4rk1/1p3ppp/p7/3p4/3P4/8/PP3PPP/R4RK1 w - - 0 1',
        orientation: 'white',
        caption: 'Black has played ...a6 and ...a5 (imagine). This creates an asymmetry: Black has a queenside pawn majority but the a6 pawn may become weak. White has a queenside pawn majority as well (a2, b2, possibly c2). The question is: can Black create a passed pawn on the queenside before White\'s structure creates a weakness? These subtle imbalances decide master-level endgames.'
      }
    ],
    exercises: [
      {
        id: 'mg-pi-01',
        fen: 'r4rk1/pp3ppp/8/3p4/3P4/8/PP3PPP/R4RK1 b - - 0 1',
        moves: ['a7a5', 'a2a4']
      },
      {
        id: 'mg-pi-02',
        fen: 'r4rk1/1p3ppp/p7/3p4/3P4/8/PP3PPP/R4RK1 b - - 0 1',
        moves: ['b7b5', 'b2b4']
      },
      {
        id: 'mg-pi-03',
        fen: 'r4rk1/pp4pp/5p2/3p4/3P4/5P2/PP4PP/R4RK1 b - - 0 1',
        moves: ['a7a5', 'f3f4']
      }
    ]
  }

};
