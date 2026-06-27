// ═══════════════════════════════════════════════════════════════
//  2:17 AM — Content File
//
//  This is the only file you need to edit to update the website.
//  Save after any change and the site refreshes automatically.
//
//  POEMS:
//    Each poem has a title and text.
//    Use a template literal (backtick string) for multi-line poems.
//
//  SECTIONS:
//    Group poems into chapters. Each section has an id, title,
//    and an array of poems.
// ═══════════════════════════════════════════════════════════════

// ─── Hero ─────────────────────────────────────────────────────
export const hero = {
  title: "2:17",
  titleAccent: "AM",
  author: "by A.Q.",
  intro: "some thoughts only exist after midnight.",
};

// ─── Featured piece ───────────────────────────────────────────
// Displayed prominently before the archive sections begin.
// Set enabled: false to hide it, or change text/poemId any time.
export const featuredPiece = {
  enabled: true,

  label: "FEATURED",

  title: "Lost In My Thoughts",

  text: `Lost in my thoughts—
  they ask me, what are you thinking of?

  I answer, nothing.

  How can I tell them
  that "nothing" is all I have left?`,
};

// ─── Sections ─────────────────────────────────────────────────
export const sections: Section[] = [
  {
    id: "unsaid",
    title: "things i never said out loud",
    poems: [

      {
        id: "unsaid-1",
        title: "The World Turns, But I Stay Still",
        text: `I was never afraid of silence
      until you filled it with your voice.

      I never feared being alone
      until I knew what it meant to be with you.

      Now—

      every second you're away
      feels like something's missing in me.

      Like a part of my chest is hollow,
      like breath caught in my throat.

      When you are not near,
      nothing quite feels real.

      The air moves, but it doesn't breathe.

      The world turns,
      but I stay still.`,
        align: "left",
        style: "verse",
      },
      {
id: "unsaid-2",
title: "Should I Stop Writing About You?",

text: `Should I stop writing about you?

Am I exposing too much of my heart?

Even though I am, this love is a precarious dance—
One step forward, two steps back—
Fearing it will frighten you.

But how can I hide what’s already carved into my soul?

You linger in my thoughts,
Tracing every moment of my day.

I think of you—
I dream of you—

And with shaking hands, I confess—

I’m in love with you.

Is it reckless?
Too much, too soon?

I’m lost in this feverish affair,
My heart a storm refusing to be calmed.

Yet I know,
In your arms,
It might finally surrender.

I can’t believe I’m awake at night,
Penning these verses,
Promising I wouldn’t fall—
Yet sinking deeper still.

The spell you’ve woven holds me tight.

And now I find myself captive—

Unable,
Unwilling,
To break free.

Not even for a single breath.

Not even for a heartbeat.`,
align: "left",
style: "verse",
},
{
  id: "unsaid-3",
  title: "Words Fall Short",
  text: `I call myself a poet—
Yet my words fall short
Of what I feel for you.

These emotions—so strong—
How do I explain
How much I miss you?

How do I say
I want you to stay—
That I'd keep you, forever—
If I could?

This love runs deep—
Like the ocean—
And I fear
It will never let me go.

My dearest Bubu—
This love—it aches,
It crawls beneath my skin.

So much to give you—
So little time.

Come to me, baby—
Let me give you
All this love I carry.

Let our souls meet—
Mend—
And be one—
Forever and ever.`,
  align: "left",
  style: "verse",
}
],
},
  {
    id: "leaving",
    title: "you left in smaller ways first",
    poems: [
      {
        id: "leaving-1",
        title: "The World Turned Cold",
        text: `I was abandoned to this selfish world,
      You vanished without a trace—no warnings.

      Now, no one sees me,
      no one tries to understand.

      Your presence was a light in my shadows,
      A voice that called out the parts of me
      hidden from the world.

      With you, I wasn’t invisible—
      You saw me when others turned away,
      Loved me when I doubted my own worth.

      That's why I loved you,
      You made me feel real,
      like I belonged.

      Now, all that’s left is silence,
      An empty space where your warmth once held me.

      You left—
      my sky folded into itself—
      and the world turned cold.

      I wonder—
      will I ever find such light again?`,
        align: "left",
        style: "verse",
      },
     {
id: "leaving-2",
title: "A Hand, Not a Heart",

text: `I loved her like the sky loves stars—
Too far to ever touch—

She smiled, but never quite the way
I needed her to.

She let me near, but not too close,
A hand, but not a heart—

Her world was warm, but not for me.
I played a patient part.

I gave her all the light I had,
She took it like the day—

But kept her own sun hidden deep
And turned her face away.

She wasn't cruel.
She wasn't kind.
She simply wasn't mine.

And loving her began to feel
Like crossing some old line.

So I will go,
Though soft and slow—

Not angry,
Not untrue—

Just quiet as a falling leaf
Who knows what it must do.

I'll keep her in a gentler place—
Where longing cannot grow—

A girl I loved,
Not quite enough,
To ever make her know.`,
align: "left",
style: "verse",
},

{
id: "leaving-3",
title: "In Pieces",

text: `It's strange,
how someone can look at you
like they almost mean it—

and that "almost"
can break you
just the same.

I'll let her go.
Not in one grand goodbye—
but in pieces.

In rewinding old songs
and not reaching for my phone.

In forgetting
what her laugh sounded like
at the end of a long day.

And maybe one day,
I'll remember her
without shaking.`,
align: "left",
style: "verse",
},
    ],
  },

  {
    id: "becoming",
    title: "i became someone i don't recognize",
    poems: [
      {
        id: "becoming-1",
        title: "i buried myself gradually",
        text: `I wasn’t always like this—
      Or was I?

      Was I born this dim—
      without a hue?

      Or did my colors fade—
      By living?

      Was I always solitary—
      Or did I lose my way—
      And all the faces vanished?

      Was I hopeless from the start—
      Or did the years conspire—
      To hollow me?

      I stain my hair with brightness—
      To mask the life that pales inside.

      I wear a smile in daylight—
      While inside—
      I am crumbling to dust.

      Was it always—me?

      Or has Time—
      Been crueler than I knew?`,
        align: "left",
        style: "verse",
      },
      {
id: "becoming-2",
title: "The Ghost Who Breathes in Daylight",

text: `Who am I?
I don't relate to anyone.
The faces pass—
but none quite turn.

What do I feel?
A silence, deep—
too wide for words,
too strange for comfort.

Whom am I becoming?
I cannot tell—
not like the others—
not like the rest.

A riddle—
bound in breath and bone—
A shape that doesn't fit the mold.

Am I a flaw?
A ripple in the cloth—
the thread that wouldn't lie flat?
A question no one's asking?

Am I deviant—
Or just divine—
Too strange for streets the world walks down?

Where do I place this wilderness?
These feelings—
feral—
flickering—
That beg to bloom, but find no Spring?

Where do I go—
with all these hours
filled with thoughts
no one echoes?

Who would understand?
If even stars seem foreign—
And words fall mute in human air?

Who will I tell—
if no one listens
in the way I need?

Must I remain—
Unseen—
A ghost who breathes in daylight?

Is this it?
To live unseen—
and make a home
inside that shadow?`,
align: "left",
style: "verse",
},
      {
id: "becoming-3",
title: "A Quiet, Unseen Ache",

text: `Why do I feel so empty still—
With all this love around?
A thousand voices in the air,
Yet mine makes not a sound.

They smile—
and I pretend to smile—
But something aches inside.
A loneliness that lingers on,
A shadow I can't hide.

Will this be how my story ends—
A quiet, unseen ache?
Or will the hunger in my heart
Refuse my soul to break?

Perhaps—
the longing keeps me here—
When nothing else can stay.
And craving love—
or being known—
Might steal my death away.`,
align: "left",
style: "verse",
},


    ],
  },

  {
    id: "gentle",
    title: "the world was never gentle with girls like me",
    poems: [
      {
        id: "gentle-1",
        title: "wild, fierce, free",
        text: `Why must I beg for love to see
      The soul that burns, complete, in me?

      Why must I bend to brittle norms,
      A fragile frame in endless storms?

      Why do you hide me in the night,
      Ashamed to hold me in the light?

      Your voice, a cage, your eyes, a chain—
      But I won’t wear your mask of shame.

      You tell me "change," with every breath,
      Yet shrink beside my living depth.

      You cast your doubts like shadows wide,
      But know I stand, with nothing to hide.

      No longer bound by all you seek,
      No need to fit the mold you keep.

      I am whole—fierce, wild, and free—
      And I shall live as only me.`,
        align: "left",
        style: "verse",
      },
      {
id: "gentle-2",
title: "In Love With Open Skies",

text: `They clipped my wings—and kindly smiled,
And said,
"One day, Heaven waits."
But I, in love with open skies,
Felt strangled by their gates.

The bars were built of "should have been,"
The cell of "never dare."

The air itself a silent judge—
I gasped for breath in there.

The stars would call me every night
With quiet silver speech,
But gravity of all their norms
Would pull me from their reach.

When will I scatter like a bird,
Or flutter from this cage?
Just let me steal one breath of free
Before I reach the grave.`,
align: "left",
style: "verse",
},
{
id: "gentle-3",
title: "I Hold Flame",

text: `They ask me—
What do you crave, what do you need?
I say—not much.
Only to be wild.
To be free.

To live without asking,
To fly without fear,
To wander where the path runs out,
To feel it all—

The wind,
The wonder,
The ache.

Is it too much to ask?
To claim the independence
That breathes in my bones?

To take what was never truly given—
Only mine,
And yet withheld?

They hold the key,
But I hold flame.
And someday—

Someday,
I'll burn the sky open.
I'll fly—
No master,
No tethered path.

I'll rise like a hawk at first light—
Cut through the hush with wings in flight.

Far from their hands,
Their chains,
Their frown.
Alive.
Unbroken.
And never come down.`,
align: "left",
style: "verse",
},

    ],
  },
];

// ─── About ────────────────────────────────────────────────────
export const about = {
  paragraphs: [
    "A home for unfinished conversations, lingering memories, and thoughts that arrive after midnight.",

    "These poems were written across different versions of the same life.",

    "Some stayed as fragments.\nSome became wounds.\nSome became poems.",

    "Some of these poems were written years apart. They all arrived at the same place.",

    "There are no answers here.\nOnly memories, questions, and the occasional attempt to make sense of them.",

    "For the ones who stayed too long in their thoughts."
  ],

  closing: "2:17 AM is not a time.\nIt is a place.",
};

// ─── Footer ───────────────────────────────────────────────────
export const footer = {
  title: "Find me at 2:17",
  tagline: "or don't. I'll still be here.",
  colophon: "[ a closing line \u2014 a time, a place, a feeling ]",
  links: [
  
  ],
};

// ─── Types ────────────────────────────────────────────────────
export interface Poem {
  id: string;
  title: string;
  text: string;
}

export interface Section {
  id: string;
  title: string;
  poems: Poem[];
}
