"use client";

import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Info from "../Icons/Info";

const AboutButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} isIconOnly>
        <Info size={24} color="#f9fafb" />
      </Button>
      <Modal
        isOpen={isOpen}
        size="xl"
        backdrop="blur"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="h-4" />
                <div className="flex flex-row items-center justify-center">
                  <Image src="/images/rangkumin.png" height={48} isBlurred />
                  <h2 className="text-xl font-acorn">Rangkumin</h2>
                </div>
                <p className="text-center">
                  Rangkumin simplifies complex information into concise,
                  meaningful summaries. Perfect for students, professionals, and
                  lifelong learners who want to save time and absorb knowledge
                  efficiently.
                </p>
                <div className="h-4" />
                <div className="">
                  <h2 className="text-center text-sm">
                    Handcrafted by{" "}
                    <a
                      className="font-semibold"
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://xann.my.id"
                    >
                      Xanny
                    </a>
                  </h2>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AboutButton;
