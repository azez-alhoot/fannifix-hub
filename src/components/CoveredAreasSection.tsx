"use client";

import { getKuwaitAreasByGovernorate } from "@/data";
import { AreaChip } from "./AreaChip";

// Popular areas to emphasize
const POPULAR_AREAS = [
  "hawalli",
  "salmiya",
  "farwaniya",
  "jahra",
  "khaitan",
  "fahaheel",
  "sabah-alsalem",
  "mahboula"
];

export const CoveredAreasSection = () => {
  const areasByGovernorate = getKuwaitAreasByGovernorate();

  return (
    <section 
      className="py-20 bg-[#F8FAFC]"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            المناطق المغطاة في الكويت
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-3">
            نغطي جميع المناطق والمحافظات الرئيسية في الكويت
          </p>
          {/* Trust Line */}
          <p className="text-base font-semibold text-primary max-w-xl mx-auto">
            نغطي جميع مناطق الكويت بدون استثناء
          </p>
        </div>

        {/* Areas by Governorate */}
        <div className="space-y-8">
          {areasByGovernorate.map(({ governorate, areas }) => (
            <div key={governorate} className="space-y-4">
              {/* Governorate Header */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {governorate}
              </h3>
              
              {/* Areas Grid - Desktop: multiple rows, Mobile: horizontal scroll */}
              <div className="flex flex-wrap gap-3 md:justify-start overflow-x-auto pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {areas
                  .sort((a, b) => {
                    // Sort: popular areas first
                    const aPopular = POPULAR_AREAS.includes(a.slug);
                    const bPopular = POPULAR_AREAS.includes(b.slug);
                    if (aPopular && !bPopular) return -1;
                    if (!aPopular && bPopular) return 1;
                    return 0;
                  })
                  .map((area) => {
                    const isPopular = POPULAR_AREAS.includes(area.slug);
                    return (
                      <div key={area.id} className="relative">
                        {isPopular && (
                          <div className="absolute -top-1 -right-1 z-10 w-2 h-2 bg-accent rounded-full animate-pulse" />
                        )}
                        <AreaChip 
                          area={area} 
                          className={isPopular ? "ring-2 ring-accent/30 shadow-md" : ""}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">
                {areasByGovernorate.reduce((sum, g) => sum + g.areas.length, 0)}
              </div>
              <div className="text-sm text-gray-600 mt-1">منطقة مغطاة</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">
                {areasByGovernorate.length}
              </div>
              <div className="text-sm text-gray-600 mt-1">محافظة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

