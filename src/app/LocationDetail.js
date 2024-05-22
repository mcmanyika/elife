import { useRouter } from 'next/router';
import Layout from './components/Layout'

export default function LocationDetail() {
  const router = useRouter();
  const { location } = router.query;

  // Fetch location data based on the location parameter
  // Replace this with your actual data fetching logic
  // const locationData = fetchData(location);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto bg-white p-56">
        <h1 className="text-3xl font-bold mb-4">{location}</h1>
        {/* Display location details here */}
      </div>
    </Layout>
  );
}
