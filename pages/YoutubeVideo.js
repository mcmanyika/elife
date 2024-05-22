

const YoutubeVideo = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto mt-8">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://youtu.be/xjE5wTIX0lQ"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-300"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default YoutubeVideo;