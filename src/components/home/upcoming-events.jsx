import React from "react";
import events from "../../helpers/data/events.json";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import "./upcoming-events.scss";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";  //buttonlari aktive etmek icin indirdik 
import "swiper/css";
import "swiper/css/navigation";
import EventCard from "../events/event-card";

const upcomingEvents = events.filter(
  (item) => new Date(item.date) > new Date()
);
//eventleri filtreledik --> sadce gelecek olan eventleri aldik ve tarihlerini suan ki tarihden daha sonra tarihler olanlari al dedik
//event tarihleri ile mevcut sistem tarihini karsilastirip, gelecek tarihleri event leri filtreliyoruz

const UpcomingEvents = () => {
  return (
    <div className="upcoming-events">
      <Container>
        <h2>
          <div className="prev">
            <FaChevronCircleLeft />
          </div>
          <div>Upcoming Events</div>
          <div className="next">
            <FaChevronCircleRight />
          </div>
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={50}
          modules={[Navigation]}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          breakpoints={{
            576: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
          }}
        >
          {upcomingEvents.map((item) => (
            <SwiperSlide key={item.id}>
              <EventCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default UpcomingEvents;

//swiper in direk yanina yazilan responsive ozellikler en kucuk halinde nasil olmasini istiyorsak oyle yaptik 
//once 1 ile basladik sonra ekren buyudukce 2, 3 ve en buyuk de 4 tane resim gostercek --> 576 dan önce 1 olan calsiir gibi bir mantik var
//swiper en distaki bulunan yapi..> swiper slide da ise ilerlmeisini istedgimiz kisimlari ekliyoruz
