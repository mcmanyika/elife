import Image from "next/image";
import Link from "next/link";
import Layout from './components/Layout';
import Header from './components/Header';
import AllAgents from '../../pages/AllAgents'
import EventList from '../../pages/EventList'
import Subscribe from './components/Subscribe'

export default function Home() {
  return (
    <Layout>
      <AllAgents />
      <EventList />
      <Subscribe />
    </Layout>
  );
}
