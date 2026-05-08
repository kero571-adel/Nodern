"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HiOutlineCheckBadge } from "react-icons/hi2";

export default function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");

  const items = [
    { key: "item1" },
    { key: "item2" },
    { key: "item3" },
    { key: "item4" },
  ];

  return (
    <section id="about" className="py-24 relative bg-black">
      <div className="container w-11/12 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              {t("title")}
            </h2>
            <p className="text-2xl text-blue-500 font-semibold italic">
              {t("line1")}
            </p>
            <p className="text-3xl md:text-4xl font-bold text-white">
              {t("line2")}
            </p>
            
            <div className="pt-8 space-y-4">
              <p className="text-xl text-gray-300 font-medium border-l-4 border-blue-600 pl-4">
                {t("impression")}
              </p>
              <p className="text-xl text-blue-400 font-bold">
                {t("guarantee")}
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group flex items-start gap-4"
              >
                <div className="mt-1">
                  <HiOutlineCheckBadge className="text-2xl text-blue-500 group-hover:scale-110 transition-transform" />
                </div>
                <p className="text-lg md:text-xl text-gray-300 group-hover:text-white transition-colors">
                  {t(item.key)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
