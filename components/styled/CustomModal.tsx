import React, { FunctionComponent, useState } from "react";
import { StyleSheet, Text, Modal, View } from "react-native";
import { PressableText } from "./PressableText";

type ModalProps = {
  activator?: FunctionComponent<{
    handleOpen: () => void;
  }>;
  children: FunctionComponent<{
    handleOpen: () => void;
    handleClose: () => void;
  }>;
};

export function CustomModal({ activator: Activator, children }: ModalProps) {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpen = () => {setModalVisible(true)}
  const handleClose = () => {setModalVisible(false)}

  return (
    <>
      <Modal visible={isModalVisible} transparent={false} animationType="slide">
        <View style={styles.centerView}>
          <View style={styles.contentView}>{children({handleOpen ,handleClose})}</View> 


          <PressableText
            onPress={handleClose}
            text="Close"
          ></PressableText>
        </View>
      </Modal>
      {Activator ? (
        <Activator handleOpen={handleOpen} />
      ) : (
        <PressableText
          onPress={handleOpen}
          text="Open"
        ></PressableText>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  link: {
    fontSize: 15,
    fontWeight: "normal",
    fontFamily: "montserrat-bold",
    textDecorationLine: "underline",
  },
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    marginBottom: 20,
  },
});
