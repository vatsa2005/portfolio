import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export default function DraggableCardDemo() {
  const items = [
    {
      title: "Web Development",
      image: "/texus-25-img.png",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
      description: "Full-stack applications with modern frameworks",
    },
    {
      title: "Blockchain",
      image: "petition-img.png",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
      description: "User-centered blockchain solutions",
    },
    {
      title: "Backend Systems",
      image: "ledgerbooks-img.png",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
      description: "Scalable server architectures",
    },
    {
      title: "Cloud Solutions",
      image: "xo-img.png",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
      description: "AWS, Azure, and GCP deployments",
    },
  ];

  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
        <h2 className="text-4xl md:text-6xl font-bold text-yellow-400/20 text-center mb-4">
          Interactive Portfolio
        </h2>
        <p className="text-lg md:text-xl text-white/40 text-center max-w-md">
          Drag the cards to explore my skills and expertise
        </p>
      </div>

      {items.map((item, index) => (
        <DraggableCardBody key={index} className={item.className}>
          <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="pointer-events-none relative z-10 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20" />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-300">{item.description}</p>
          </div>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
