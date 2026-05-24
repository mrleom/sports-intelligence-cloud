# Session Builder Soccer Diagram Language Research

## Why this matters

In SIC’s own recent Session Builder review work, diagram usefulness is now the biggest repeated gap left after the deterministic activity-text improvements. Generated packs still do not carry structured diagram specs, and the frontend is doing most of the diagram work through inferred placeholders. That makes a frontend-first symbol-system pass the right next move, not a detour. fileciteturn0file2 fileciteturn0file1

The public research points the same way. In soccer, the job of a diagram is not decoration; it is tactical communication. Academic work on soccer coaching interfaces shows that coaches and players struggle when tools do a poor job conveying spatial relationships, coordinated movement, and timing, and that too much information can create cognitive overload rather than clarity. At the same time, sports notational analysis remains valuable precisely because it creates a durable, interpretable record that feeds the coaching process. citeturn30view0turn17search0turn10view5

## What the research says

There is no single universal soccer diagram standard that everybody uses. Instead, the ecosystem is built around a shared visual grammar and a lot of tool-specific icon libraries. easy2coach advertises more than 250 soccer icons, SoccerTutor’s Tactics Manager advertises 288 player actions, and even simpler tactic-board apps emphasize straight, curved, dashed, and freehand arrows, area highlights, and equipment icons such as cones, goals, mannequins, ladders, hurdles, and flags. That matters for SIC because NN/g’s icon-usability research is a strong warning: “universal” icons are rare, and icons need visible text labels when meaning is not already obvious. In practice, that means SIC should stop looking for a mythical industry-standard legend and instead define a strict, repeatable house language. citeturn16view3turn16view4turn27view0turn10view0

Official coaching materials do show a consistent pattern, even if they do not publish a single formal legend. In FIFA session-plan graphics, the pitch is simplified into a clean board view; players are color-coded; goals, mini-goals, cones, and mannequins are drawn as lightweight icons; and arrows differentiate ball movement, carries, and supporting actions. The diagram is then paired with nearby text blocks for organization, explanation, variation, and coaching points. Sport Session Planner examples follow the same communication pattern: diagram on one side, practical text on the other, not a giant legend-heavy tactical poster. citeturn23view0turn23view1turn23view2turn23view3turn23view4turn16view1

The usability literature reinforces that pattern. Graph comprehension improves when legends are spatially compatible with the visual they explain, especially once complexity rises. Icons are more usable when labels are visible rather than hidden. Material’s icon guidance likewise stresses minimal forms that stay readable at both large and small sizes. Put differently: coaches should not have to bounce between a distant legend, a crowded board, and long prose just to understand who moves where. citeturn10view2turn10view0turn10view1

The research on static versus dynamic soccer visualizations is especially useful for SIC because it cuts through a lot of product temptation. In a study on animated soccer scenes, novices learned better from static presentations while experts benefited more from animated ones. A newer eye-tracking study found that dynamic drawing did not produce a universal advantage either; effectiveness depended on expertise and visuospatial ability. That is a very practical result for your codebase: do not chase “smart animation” before you have nailed clear static boards. High-quality static SVG diagrams are the right next slice. citeturn29view0turn29view1

Age adaptation also matters. U.S. Soccer’s session-plan resources are explicitly framed around age-appropriate plans with diagrams and progressions, and Play-Practice-Play is built around game-like learning. US Youth Soccer goes further and calls for developmentally appropriate activities, clear and concise information, simple-to-complex sequencing, decision making, and game implications. For the youngest players, it even notes limited understanding of time and space and a need for simple rules. Football Australia’s coaching resources echo the same theme with “simple and easy-to-follow” session plans adaptable by age and skill level. That means SIC should deliberately draw less for U8/U10 and only expand tactical density for older groups. citeturn13view0turn13view2turn13view3turn15view1turn15view2turn13view4

## SIC symbol language

The best public evidence says SIC should use a **small, opinionated, soccer-native vocabulary** rather than a sprawling board of every possible icon. FIFA diagrams, session-planning tools, and coaching resources all succeed by repeating a tight set of visual objects and movement cues; they do not rely on an encyclopedia-sized legend every time. citeturn23view0turn23view1turn23view2turn23view3turn16view1turn27view0

| Element | SIC visual standard | Why this should be the default |
|---|---|---|
| Coached outfield player | Filled blue circle token | Keeps coached team identity stable across all activities |
| Opposition / defender | Filled red circle token | Instantly separates pressure from coached actions |
| Neutral / support player | Filled gray circle token with small halo | Clear “plays with team in possession” role without reading long text |
| Goalkeeper | Team-colored circle plus square outline or glove notch | Keeps GK role distinct without a totally separate art style |
| Ball | Small black-and-white or dark outlined ball | Readable at small sizes and familiar |
| Cone | Small yellow marker / disc-cone glyph | Standard practice object, should never be confused with players |
| Mannequin / pole | Tall amber stick figure or post icon | Needed for first-touch, finishing lanes, and passing circuits |
| Full goal | White outlined goal frame | Match-like target |
| Mini goal / Pugg | Small white frame goal; add `PUGG` text badge only when needed | Portable goals are functionally “small goals”; brand specificity is best handled by a tiny label, not a weird new shape |
| Gate | Two cones joined by a dotted gate bar | Coaches immediately read this as a scoring/escape gate |
| Channel / zone / box | Soft tinted rectangle with dashed outline | Shows field geometry without overpowering player movement |
| Start station | Small numbered badge or letter badge | Useful in passing circuits and rotation drills |
| Pass / shot | Solid arrow | Most conventional, most readable movement encoding |
| Player run / support run | Dashed arrow | Different enough from pass without needing color alone |
| Dribble / carry | Wavy or toothed arrow | Matches common coaching-board convention and is visually distinct |
| Pressure / recovery run | Red dashed arrow | Pressure should look different from attacking support at a glance |
| Rotation / reset | Curved loop arrow | Best for “follow your pass,” switch lines, or station rotation |
| Sequence order | Step badges `1`, `2`, `3` | Helps when action order matters more than timing detail |

A few house rules matter as much as the symbols themselves. First, use **redundancy**: meaning should come from both line style and color, not color alone. Second, keep attacking direction consistent within a session review. Third, directly label only the **unique tactical anchors** on the pitch—things like `Wide channel`, `Recovery line`, `Target zone`, or `Free player`—and let the legend explain generic symbols. That recommendation is consistent with the research: icons are often ambiguous without labels, but labels should clarify, not flood the screen. citeturn10view0turn10view1

## SIC legend standard

The public examples suggest that a **global always-on legend is too heavy**, but a **dynamic local legend** is very useful once SIC introduces more role-aware symbols. FIFA’s plan pages usually avoid a dedicated legend because the symbol set stays compact and the explanatory text sits right next to the board. The moment SIC adds more explicit semantics—pressure arrows, recovery arrows, neutrals, gates, mini-goals, mannequins, sequence steps—the legend needs to be smarter, not larger. citeturn23view0turn23view1turn23view2turn23view3turn10view2

| Legend mode | When to use it | What it should contain |
|---|---|---|
| Hidden | Very simple setup with only players, ball, cones, and one obvious arrow type | Nothing; rely on direct labels and caption |
| Compact | Most normal SIC activity panels | Only symbols actually used in that panel |
| Expanded | Panels with neutrals, multiple arrow types, mini-goals/Pugg goals, or rotation logic | Still panel-specific, but grouped by roles, movement, and equipment |

The legend should always use the same order. Start with **roles** (`Coached`, `Opposition`, `Neutral`, `GK`), then **movement** (`Pass/shot`, `Run`, `Carry`, `Press/recover`, `Rotate`), then **equipment and targets** (`Cone`, `Gate`, `Mini goal`, `Pugg`, `Mannequin`), then **space markers** (`Zone`, `Channel`, `Target zone`). That order matches how a coach visually parses an activity: who is involved, what moves, where it scores, and what field geometry matters.

The labeling rule should be simple. Use a **legend item** for repeated symbols and a **direct label** for one-off spatial anchors. So `Blue = coached team` belongs in the legend if the panel is complex; `Recovery line` belongs directly on the board because its location matters. This approach is consistent with local legend-compatibility research and with NN/g’s finding that labels should be visible for ambiguous icons, not hidden or deferred. citeturn10view2turn10view0

## SIC story model

The right model for SIC is a **three-beat coaching story**: **Setup**, **Action**, and **Score/Reset**. That fits how high-quality session resources are written, how FIFA activity pages separate organization from explanation and coaching points, and how coaches actually run activities on the ground. It also matches your own internal direction almost exactly; the public research mainly strengthens it. citeturn13view0turn22view0turn22view1turn30view0turn0file0

| Panel | Must communicate | Caption style |
|---|---|---|
| Setup | Space, starting positions, equipment, ball start, role counts, main field constraints | “What the coach sets up before the first rep.” |
| Action | First trigger, primary pass/run/carry, pressure source, decision point, support picture | “What normally happens when play starts.” |
| Score/Reset | How teams score, defender win condition, restart source, rotation path, next rep logic | “How the rep ends and how the next one begins.” |

This model also solves the text-versus-picture problem cleanly. The **diagram** should answer, “What does this activity look like?” The **caption** should answer, “What is the one key behavior in this stage?” The **full activity text** should answer, “What are the precise rules, coaching cues, and progressions?” U.S. Soccer’s session-plan framing—clear instructions, diagrams, and progressions—is basically the same separation of concerns. citeturn13view0turn13view2turn15view1

For youth simplicity, do not force every activity into three dense tactical boards. At U8/U10, keep the information budget low: fewer tokens, one obvious action path, one scoring object, and short captions. US Youth Soccer explicitly emphasizes simple rules and limited time-and-space demands for the youngest players, while Play-Practice-Play prioritizes game-like experience over coach-heavy explanation. At U12/U14 and older, you can safely add a second defender, directional targets, counter paths, and more explicit transitions. citeturn13view2turn13view3turn15view2

For the final game block, stay light unless the game has a very specific tactical constraint. U.S. Soccer’s final Play phase is supposed to look like the game with minimal interruption, so the diagram burden usually falls. In SIC, that means a **final-game card** is often enough: team shape, scoring method, restart source, and the one live constraint. Only draw a full tactical board if the final game meaningfully adds zones, a neutral, overload rules, or special scoring targets. citeturn13view2

Finally, keep these diagrams **static first** and **mobile-safe by design**. Material icons are optimized for clarity at small sizes, and the soccer-visualization research says dynamic presentation is not universally better. On mobile, stack the three panels vertically and give each panel one dominant message. On desktop, keep the same three-beat logic but allow more whitespace and a compact legend beside or beneath each panel. citeturn10view1turn29view0turn29view1

## Theme requirements

The following requirements are a synthesis of FIFA overload, wide-channel, 1v1 defending, receiving-under-pressure, possession, and finishing practices, along with the current SIC fixture themes. The point is not to recreate the exact drills from those sources; it is to borrow the communication logic they use well. citeturn19view0turn19view1turn19view2turn8view2turn21view0turn21view1turn8view5turn8view1turn8view4

### Attacking overloads and wide free player

This diagram type should always show the **numerical advantage**, not just generic attacking arrows. At minimum, show the ball-side wide channel, the overloaded side, the spare or free player, and the defender being isolated. If the activity is about switching to create the overload, include the switch lane and the far-side space; if it is about exploiting the overload already created, show the overlap or underlap run and the target action after the spare player is used. FIFA’s overload material repeatedly emphasizes using the spare player, interchanging positions, overlapping or underlapping, and creating 2v1s inside larger overloads, so SIC should make all of those coach-readable in the picture. citeturn19view0turn19view1turn19view3

### Defending 1v1 angle and delay

This diagram should be one of the clearest in the product because the teaching point is sharp. Show a narrow channel or angled approach to goal, the attacker’s start, the defender’s start, the press trigger, and the defender’s side-on body shape. The “score/reset” panel should show two outcomes: attacker scores through a gate or to goal, defender wins and counters to a mini-goal or safe exit. FIFA’s 1v1 defending example explicitly centers body shape, timing, forcing wide, and the press trigger off the incoming pass, with the mini-goal giving the defender a concrete reward after the win. citeturn8view2

### First touch under pressure

This one should show the **receiver’s problem**, not just another passing pattern. The setup should include the server, receiver, pressure source, and the box or channel where the first touch happens. The action panel should show scanning before receiving, an open or side-on body orientation, and a first touch that escapes pressure into a gate or open lane. The reset should make the station rotation obvious. FIFA’s receiving-under-pressure practices repeatedly stress scanning, body orientation, first touch away from pressure, receiving on the half-turn, and moving into space rather than receiving statically; SIC should reflect those elements visually, not only in prose. citeturn21view0turn21view1turn21view2turn21view4

### Directional possession under pressure

This is where SIC must stop drawing “generic possession” boards. The diagram needs directionality: zones or thirds, target players or target zones, where neutrals sit, and what counts as successful progression. If the activity includes countering after a regain, show the regain path too. FIFA’s possession examples are explicit about progressing from one side to the other, working through lines, using numerical advantages, scanning, open body posture, and moving between zones. So the SIC board should show one end-to-end story: keep, escape, progress, and maybe transition. citeturn8view5turn21view2turn8view0

### Pugg goal finishing

Do not draw this as a generic goal-finishing drill if the selected equipment is specifically Pugg goals. Coaches need to see the small goal targets, the feeder or server, the shooter, the angle of entry, and whether there is live pressure or a recovering defender. If rebounds or second actions matter, show that in the score/reset panel rather than hiding it in text. Public finishing resources emphasize quick combinations, movement timing, receiving into finishing actions, and creating a shot under pressure; SIC should pair that logic with a **small-goal target symbol** and a short `PUGG` label only when the equipment specificity matters. Because icons are rarely universal, the tiny label is better than inventing a visually exotic Pugg icon. citeturn8view1turn8view4turn10view0turn0file2

### Mini-goal possession

Mini-goal possession should visually read as a possession game with **secondary attack targets**, not as a box with random goals. Show the mini-goals as scoring objects on the end or side that matters, indicate which team counters to them after a regain, and clearly mark the support or neutral player if one exists. If the activity is really directional, the board should show the end-to-end target first and the mini-goals as transition rewards second. FIFA’s 1v1 and build-up examples show how mini-goals create a concrete counter target; SIC should use the same clarity when mini-goals appear in possession fixtures. citeturn8view2turn19view4

### Final game and competitive close

For the final game, the coach usually needs the **constraint picture**, not a cinematic replay board. Show team directions, main scoring goal or gate, restart source, and the one special condition that keeps the activity linked to the session theme. If the final game includes a neutral, scoring zone, overload rule, or bonus-point behavior, show only those additions. Otherwise, the simple final-game card is correct. That is consistent with Play-Practice-Play’s emphasis on game-like expression and minimal coach interruption in the closing phase. citeturn13view2

## Roadmap and implementation plan

The research supports the same conclusion your internal work already surfaced: the best next branch is **`session-builder-diagram-symbol-system`**, not backend diagram generation, not AI images, and not a big infrastructure move. SIC already has placeholder theme kinds for overloads, 1v1 defending, first touch, possession, mini-goal possession, and Pugg-goal finishing; the highest-leverage next step is to upgrade the **visual language** those kinds use. fileciteturn0file1 fileciteturn0file2

What to do now is straightforward. First, refactor `DiagramPlaceholder.tsx` around reusable semantic primitives instead of growing one giant conditional component. Second, replace oversized on-pitch labels with a consistent mix of small direct labels and a local dynamic legend. Third, make each existing theme kind visually distinct through geometry and targets, not just copy changes. Fourth, keep the output static and deterministic. The research on dynamic presentations and cognitive load says that is the right trade for now. citeturn29view0turn29view1turn30view0

A practical frontend shape for the next slice would look like this:

```ts
type DiagramRole = "coached" | "opposition" | "neutral" | "goalkeeper";
type DiagramSymbol =
  | "player"
  | "ball"
  | "cone"
  | "gate"
  | "mannequin"
  | "goalFull"
  | "goalMini"
  | "zone"
  | "channel"
  | "targetZone"
  | "stepBadge";

type DiagramAction = "pass" | "shot" | "run" | "carry" | "press" | "recover" | "rotate";

type DiagramLegendItem = {
  key: string;
  symbol: DiagramSymbol | DiagramAction;
  label: string;
};

type DiagramPanel = {
  title: "Setup" | "Action" | "Score / Reset";
  caption: string;
  tokens: RenderToken[];
  legend: DiagramLegendItem[];
};
```

Then map each inferred kind to a small pattern builder, not to freeform JSX sprawl:

```ts
const patternByKind = {
  attacking_overload: buildAttackingOverloadPanels,
  defending_1v1: buildDefending1v1Panels,
  first_touch_pressure: buildFirstTouchPanels,
  directional_possession: buildDirectionalPossessionPanels,
  mini_goal_possession: buildMiniGoalPossessionPanels,
  pugg_goal_finishing: buildPuggFinishingPanels,
  generic_small_sided: buildGenericPanels,
};
```

The “do now” checklist for that branch should be:

| Do now in `session-builder-diagram-symbol-system` | Why now |
|---|---|
| Create semantic SVG primitives for players, gates, mini goals, mannequins, zones, and arrow types | Gives you a real house language instead of ad hoc shapes |
| Generate a **panel-specific legend** from the tokens actually rendered | Fixes the current overbroad legend problem |
| Add direct labels only for spatial anchors like `Wide channel`, `Recovery line`, `Target zone`, `Free player` | Improves readability without clutter |
| Make Activity 2 and Activity 3 differ by field geometry and target picture | Solves “text changed, diagram still feels same” |
| Render small-goal symbols when equipment says mini goals or Pugg goals | Makes equipment-specific output coach-readable |
| Keep the final-game card as the default for competitive close | Avoids over-diagramming late-session play |
| Keep all diagrams static SVG | Best quality-to-scope ratio for the current product stage |

The “do later” queue should be much shorter and much more structural. When you are ready, define a **structured activity model** with semantically meaningful fields like space, role counts, equipment, scoring rule, transition rule, and diagram intent. That direction is supported both by soccer visual-analytics research, which found semantically meaningful expert-driven features improve interpretability, and by SIC’s own current pain point: text inference is doing too much work. But that is a later branch, not the blocker for finishing Session Builder review quality now. citeturn31view0

So the practical call is simple: finish Session Builder with a **coach-native static symbol system** first. If a coach can glance at the board and immediately understand setup, roles, ball path, player movement, defensive pressure, scoring, and reset, you will have crossed the line from “template-like visual placeholder” to a real soccer coaching product.
