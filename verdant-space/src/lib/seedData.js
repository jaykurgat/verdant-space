// Seed data that works without Supabase
export const seedHero = {
  title: 'Connecting People,\nNature & Knowledge',
  tagline: 'A living archive of environmental thought, ecological storytelling, and the quiet intelligence of the natural world.',
  imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80',
}

export const seedCategories = [
  'Forestry',
  'Climate Change',
  'Ecological Restoration',
  'Biodiversity',
  'Indigenous Knowledge',
  'Urban Nature',
  'Marine Ecosystems',
]

export const seedPosts = [
  {
    id: '1',
    title: 'The Silent Language of Old-Growth Forests',
    subtitle: 'How mycorrhizal networks carry memory, signal, and solidarity beneath our feet',
    category: 'Forestry',
    body: `## The Underground Internet

There is a world beneath our feet that most of us will never see—a vast, ancient network of fungal threads called mycorrhizae that connects the roots of trees in what scientists have begun calling the "Wood Wide Web."

These networks don't just transfer nutrients. They carry signals. A tree under attack by insects can send chemical warnings through the network to neighboring trees, which then ramp up their own defenses. Mother trees—the oldest, largest trees in a forest—preferentially feed their own seedlings through these connections, even recognizing kin.

> "The forest is not a collection of individuals competing for light. It is a community, knit together by relationship, sustained by reciprocity."

## What Old Growth Holds

An old-growth forest carries centuries of accumulated intelligence. The fungi that thread through its soil have evolved alongside specific tree species over millennia. When we clearcut a forest, we don't just remove trees. We destroy an entire relational ecosystem that took hundreds of years to develop.

The tragedy of industrial forestry is not simply the loss of individual trees. It is the severing of these ancient conversations.

## Listening More Carefully

Researcher Suzanne Simard spent decades in the forests of British Columbia listening—through lab equipment and careful observation—to what the trees were saying to each other. What she found overturned the dominant model of nature as competition and replaced it with something far more interesting: nature as cooperation, as kinship, as mutual care.

This has implications not just for how we manage forests, but for how we understand community, interdependence, and what it means to thrive.

The forest is teaching us something. The question is whether we're willing to learn.`,
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
    author: 'Verdant Space',
    publishedAt: '2024-06-15T09:00:00Z',
    readTime: '6 min read',
  },
  {
    id: '2',
    title: 'Rewilding the Riverbanks of the Rift Valley',
    subtitle: 'A field report from Kenya\'s Tana River — where restoration meets resistance',
    category: 'Ecological Restoration',
    body: `## Where the River Remembers

The Tana River in Kenya is one of East Africa's most important waterways. It rises in the Aberdare Range, cuts through the country for nearly 1000 kilometers, and empties into the Indian Ocean near Garsen. For thousands of years, its seasonal floods deposited rich sediment along its banks, creating one of the most biodiverse corridors on the continent.

That corridor is disappearing.

## The Problem with "Progress"

Agricultural encroachment, charcoal production, and poorly managed irrigation schemes have stripped the riverbanks of their gallery forests. Without tree roots to hold the soil, the banks erode. Without shade, the water warms. Without the insects that live in the leaf litter, the fish populations collapse.

> "We didn't lose the river in one catastrophe. We lost it in ten thousand small decisions."

## What Restoration Looks Like

The Tana River Restoration Project, a collaboration between local communities and conservation organizations, has been replanting native riparian species along a 40-kilometer stretch of the river. But the work is more than planting trees.

It involves negotiating with farming communities about buffer zones. It means training local people as forest monitors. It requires patience—a young Ficus sycomorus tree planted today won't provide meaningful shade for another decade.

The project has replanted over 80,000 trees since 2019. The results are already visible: sections of the riverbank that were bare clay two years ago are now green with young growth.

## The Human Dimension

What doesn't appear in project reports is the social dimension of this work. The women's groups who do most of the planting. The elders who remember what the forest used to look like. The teenagers who carry seedlings in the early morning before school.

Restoration is not just an ecological project. It is a relational one.`,
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&q=80',
    author: 'Verdant Space',
    publishedAt: '2024-05-28T08:00:00Z',
    readTime: '8 min read',
  },
  {
    id: '3',
    title: 'What the IPCC Reports Miss About Local Climate Grief',
    subtitle: 'Numbers don\'t capture the loss of a glacier, a season, a way of life',
    category: 'Climate Change',
    body: `## The Limits of Data

The Intergovernmental Panel on Climate Change publishes the most comprehensive scientific assessments of climate change available. These reports are rigorously researched, peer-reviewed, and represent a genuine consensus of thousands of scientists. They are invaluable.

They also miss something important.

## The Texture of Loss

When a Bolivian Andean community watches the glacier that has defined their skyline for generations recede above the snowline—when it becomes clear that it will not return in their lifetimes, or their children's lifetimes—what happens?

The glacier was not just a water source. It was orientation. It was the landmark their grandparents used to navigate. It appeared in their stories, their ceremonies, their sense of who they are and where they come from.

> "Climate grief is real, and it is particular. No two communities lose the same thing."

## Solastalgia

The philosopher Glenn Albrecht coined the term "solastalgia" to describe the distress caused by environmental change in one's home environment. Unlike nostalgia—which is the pain of being away from home—solastalgia is the pain of home being changed around you while you remain.

It is, he argues, a kind of mourning.

## Why This Matters for Policy

The psychological and cultural dimensions of climate change are not peripheral to the crisis. They are central to it. Communities that have lost their relationship to place—through displacement, through the destruction of ecosystems they depended on, through the slow erosion of the seasonal rhythms that organized their lives—are communities that have lost something that cannot be restored by carbon markets.

The climate conversation needs more room for grief. For the specificity of what has been lost. For the acknowledgment that some of these losses are irreversible.

This is not pessimism. It is honesty—and honesty, eventually, is the ground on which better action becomes possible.`,
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
    author: 'Verdant Space',
    publishedAt: '2024-05-10T10:00:00Z',
    readTime: '7 min read',
  },
  {
    id: '4',
    title: 'Mangrove Marvels: Carbon Sinks at the Edge of the Sea',
    subtitle: 'Why protecting coastal wetlands may be our most underrated climate tool',
    category: 'Marine Ecosystems',
    body: `## The Trees That Breathe Salt

Mangroves are among the most extraordinary trees on Earth. They grow where other trees cannot—in the brackish water between land and sea, in the tidal zones where salt concentration shifts daily, where the ground itself is perpetually waterlogged.

They have evolved remarkable adaptations: aerial roots that breathe above the waterline, specialized cells that exclude salt, seeds that germinate while still on the parent tree and float to new locations.

## An Outsize Climate Role

Mangroves store carbon at a rate that is, per hectare, several times greater than tropical rainforests. The dense, waterlogged soil beneath them traps organic matter that would otherwise decompose and release carbon—locking it away for centuries or even millennia.

> "Protecting a hectare of mangrove may do more for the climate than any equivalent area of terrestrial forest."

## The Threat

Mangrove forests are disappearing faster than almost any other ecosystem. Coastal aquaculture—particularly shrimp farming—has been the primary driver, converting vast stretches of coastal wetland into pond systems.

The irony is acute: shrimp farms on former mangrove land often fail within a decade as soils acidify and nutrients deplete. The forest that sustained coastal fisheries for generations is gone, and the aquaculture that replaced it has collapsed.

## Restoration and Hope

Mangrove restoration is possible. Communities in the Philippines, Kenya, and Bangladesh have replanted thousands of hectares of coastal forest. The key, researchers have found, is letting natural regeneration guide the process—clearing invasive species and creating the right hydrological conditions, then letting the mangroves do the rest.

Where restoration has worked, fish populations have recovered within years. The relationship between forest and sea is more resilient than we might have feared.`,
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80',
    author: 'Verdant Space',
    publishedAt: '2024-04-22T09:00:00Z',
    readTime: '5 min read',
  },
  {
    id: '5',
    title: 'The Return of the Wolves: Trophic Cascades in Yellowstone',
    subtitle: 'How one predator\'s reintroduction changed the course of rivers',
    category: 'Biodiversity',
    body: `## Wolves and Rivers

In 1995, fourteen gray wolves were reintroduced to Yellowstone National Park after a 70-year absence. What followed became one of the most studied examples of ecological cascade effects in the scientific literature—and one of the most dramatic demonstrations of how ecosystems work.

The wolves did not just kill elk. They changed how elk behaved.

## Fear as an Ecological Force

Elk, suddenly aware that predators had returned, stopped grazing in open valleys and along riverbanks where they were vulnerable. The vegetation in those areas recovered. Willows, aspens, and cottonwoods grew back along the streams. Beavers returned to build dams in the new willow thickets.

Beaver dams created ponds. Ponds raised the water table. The water table sustained more diverse plant communities. The plant communities provided habitat for songbirds, small mammals, and insects.

> "The wolves changed the behavior of the rivers themselves. The rivers ran straighter, with more stable banks—because the root systems of the recovered vegetation held the soil."

## What This Teaches Us

The Yellowstone case is a lesson in humility. Our intuitive models of ecosystems—in which the primary lever is the direct killing or protecting of particular species—are too simple.

Ecology works through relationships, through fear and adaptation, through the way that the presence or absence of one animal ripples through an entire community. This is why conservation cannot be just about individual species. It must be about restoring and protecting the webs of relationship in which species are embedded.

## Beyond Yellowstone

Similar dynamics have been observed wherever large predators have been reintroduced: wolves in Europe, dingoes in Australia, sea otters in California. In each case, the ripple effects have extended far beyond the predator-prey relationship.

The lesson is always the same: the natural world is more interconnected, more intelligent, and more resilient than our management models have typically assumed.`,
    imageUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=80',
    author: 'Verdant Space',
    publishedAt: '2024-04-05T11:00:00Z',
    readTime: '6 min read',
  },
  {
    id: '6',
    title: 'Seed Libraries as Resistance: How Communities Protect Agricultural Biodiversity',
    subtitle: 'In the face of monoculture and corporate seed patents, local repositories hold history',
    category: 'Indigenous Knowledge',
    body: `## What a Seed Holds

A single seed holds the accumulated adaptation of thousands of years. The tomato varieties that thrived in the dry highlands of Peru, the bean varieties bred for the short growing seasons of highland Ethiopia, the rice varieties that survived cyclone flooding in the Bengal delta—these represent irreplaceable genetic and cultural heritage.

Most of that heritage is at risk.

## The Industrial Narrowing

The Green Revolution of the 1960s dramatically increased agricultural yields but did so by promoting a small number of high-yielding varieties at the expense of thousands of locally adapted ones. Today, 75% of global food supply comes from just 12 plants.

The consolidation of the global seed industry has accelerated this narrowing. Four companies now control more than 60% of the world's commercial seed market.

## Seed Libraries as Resistance

Around the world, communities have responded by creating seed libraries—repositories where traditional varieties are preserved, shared, and regenerated through actual cultivation.

> "A seed in a freezer is an archive. A seed in a garden is a living relationship."

These are not museums. They are active cultivation networks, where seeds are grown out, adapted to current conditions, and distributed back to farmers. The act of replanting is itself a form of knowledge transmission.

## The Networks Holding Knowledge

In Ethiopia, the Seeds of Survival program has worked with farmers to identify and preserve traditional varieties that have since proven crucial as climate shifts alter growing conditions. In India, the Deccan Development Society manages community seed banks that serve hundreds of villages.

These networks understand something that centralized gene banks don't: seeds are not just genetic material. They are embedded in knowledge systems—in the understanding of when and how to plant, in the varieties of cuisine that made particular crops valuable, in the social relationships through which seeds have always been exchanged.

To preserve a seed, you must preserve the community of practice around it. And that is, ultimately, a political as much as a biological task.`,
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80',
    author: 'Verdant Space',
    publishedAt: '2024-03-18T08:30:00Z',
    readTime: '7 min read',
  },
]

export const seedGallery = [
  {
    id: 'g1',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    caption: 'Ancient Douglas Fir, Olympic Peninsula',
    location: 'Washington, USA',
    category: 'Forestry',
  },
  {
    id: 'g2',
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80',
    caption: 'Dawn on the Savanna',
    location: 'Maasai Mara, Kenya',
    category: 'Biodiversity',
  },
  {
    id: 'g3',
    imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80',
    caption: 'Retreating Glacier',
    location: 'Patagonia, Argentina',
    category: 'Climate Change',
  },
  {
    id: 'g4',
    imageUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=700&q=80',
    caption: 'Boreal Lake at First Light',
    location: 'Yukon, Canada',
    category: 'Forestry',
  },
  {
    id: 'g5',
    imageUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80',
    caption: 'Mangrove Aerial Roots',
    location: 'Langkawi, Malaysia',
    category: 'Marine Ecosystems',
  },
  {
    id: 'g6',
    imageUrl: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&q=80',
    caption: 'Grey Wolf at Dusk',
    location: 'Yellowstone, Wyoming',
    category: 'Biodiversity',
  },
  {
    id: 'g7',
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=900&q=80',
    caption: 'Wildflower Meadow',
    location: 'Swiss Alps',
    category: 'Ecological Restoration',
  },
  {
    id: 'g8',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=750&q=80',
    caption: 'Aerial — Green River Delta',
    location: 'Danube, Romania',
    category: 'Ecological Restoration',
  },
  {
    id: 'g9',
    imageUrl: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80',
    caption: 'Misty Waterfall, Cloud Forest',
    location: 'Costa Rica',
    category: 'Biodiversity',
  },
  {
    id: 'g10',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
    caption: 'Mountain Summit, Sunrise',
    location: 'Himalayas, Nepal',
    category: 'Climate Change',
  },
  {
    id: 'g11',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=850&q=80',
    caption: 'Heritage Seed Harvest',
    location: 'Oaxaca, Mexico',
    category: 'Indigenous Knowledge',
  },
  {
    id: 'g12',
    imageUrl: 'https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?w=700&q=80',
    caption: 'Old Growth Canopy',
    location: 'Tongass, Alaska',
    category: 'Forestry',
  },
]
