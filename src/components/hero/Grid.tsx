import { Card, CardBody, CardHeader } from '@nextui-org/card';

export default function Grid() {
  const cards = [
    {
      title: 'Clean UI.',
      body: 'Enjoy a clutter-free experience with our Clean UI. Navigate effortlessly, focus on your music, and make playlist management abreeze.',
    },
    {
      title: 'Smooth Editing.',
      body: 'Immerse yourself in seamless playlist editing with our React Beautiful Drag and Drop powered UI.',
    },
    {
      title: 'Song Playback.',
      body: 'Delight in the seamless enjoyment of your favorite tunes while perfecting your playlists, courtesy of the Spotify Web Playback SDK.',
    },
  ];

  const cardsUi = cards.map((card, ind) => {
    return (
      <Card key={ind} className='w-72'>
        <CardHeader className='text-xl font-bold'>{card.title}</CardHeader>
        <CardBody className='opacity-70'>
          <p>{card.body}</p>
        </CardBody>
      </Card>
    );
  });

  return (
    <div className='my-20 flex w-full flex-col items-center gap-5'>
      <h1 className='text-center text-5xl font-extrabold leading-tight'>
        What Are the Benefits
      </h1>
      <div className='flex flex-wrap justify-center gap-10 p-3'>{cardsUi}</div>
    </div>
  );
}
