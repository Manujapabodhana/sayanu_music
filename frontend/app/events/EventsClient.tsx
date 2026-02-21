"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import EventCard from "@/components/EventCard";
import EventFilter from "@/components/EventFilter";
import { Button } from "@/components/ui/button";

interface EventsClientProps {
    events: any[];
}

export default function EventsClient({ events }: EventsClientProps) {
    const { t } = useTranslation();

    return (
        <div className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-8">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{t('events.title')}</h1>
                    <p className="text-gray-500 max-w-xl">{t('events.description')}</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 min-w-[140px]">
                        <p className="text-sm text-gray-500 mb-1">{t('events.totalEvents')}</p>
                        <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 min-w-[140px]">
                        <p className="text-sm text-gray-500 mb-1">{t('events.thisWeek')}</p>
                        <p className="text-2xl font-bold text-blue-900">0</p>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="sticky top-[80px] z-40">
                <EventFilter />
            </div>

            {/* Events List */}
            <div className="space-y-4">
                {events.length > 0 ? (
                    events.map((event) => (
                        // @ts-ignore
                        <EventCard key={event.id} {...event} />
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">{t('events.noEventsFound')}</p>
                    </div>
                )}
            </div>

            {/* Pagination / Results Count */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                    {t('events.showing', { from: events.length > 0 ? 1 : 0, to: events.length, total: events.length })}
                </p>
                {/* Simple Pagination Placeholder */}
                <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>&lt;</Button>
                    <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-blue-900">1</Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">...</Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">&gt;</Button>
                </div>
            </div>
        </div>
    );
}
