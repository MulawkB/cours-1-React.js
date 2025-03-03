import { db } from './database.js';
import { Suspense } from 'react';

function VideoList({ videos, emptyHeading }) {
    const count = videos.length;
    let heading = emptyHeading;
    if (count > 0) {
      const noun = count > 1 ? 'Videos' : 'Video';
      heading = count + ' ' + noun;
    }
    return (
      <section>
        <h2>{heading}</h2>
        {videos.map(video =>
          <Video key={video.id} video={video} />
        )}
      </section>
    );
  }

  async function ConferencePage({ slug }) {
    const conf = await db.Confs.find({ slug });
    return (
      <ConferenceLayout conf={conf}>
        <Suspense fallback={<TalksLoading />}>
          <Talks confId={conf.id} />
        </Suspense>
      </ConferenceLayout>
    );
  }
  
  async function Talks({ confId }) {
    const talks = await db.Talks.findAll({ confId });
    const videos = talks.map(talk => talk.video);
    return <SearchableVideoList videos={videos} />;
  }