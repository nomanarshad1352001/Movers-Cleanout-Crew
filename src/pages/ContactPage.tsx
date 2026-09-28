import PageHero from "../components/PageHero";
import QuoteForm from "../components/QuoteForm";
import CitiesRail from "../components/CitiesRail";
import GalleryRail from "../components/GalleryRail";
import { contactHeroImg } from "../data/content";

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact & Booking"
        titleLeft="Say the word."
        titleRight="Consider it moved."
        copy="Tell us about your project and a coordinator replies within the hour — a human, a flat quote, and zero pressure."
        img={contactHeroImg}
        imgAlt="The coordination desk answering customer requests"
      />
      <QuoteForm />
      <div className="py-10 md:py-14">
        <CitiesRail />
      </div>
      <GalleryRail />
    </>
  );
}
