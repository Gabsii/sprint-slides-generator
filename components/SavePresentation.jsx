import { useContext } from 'react';
import { useModal, Modal, Button } from '@zeit-ui/react';
import { Save } from '@zeit-ui/react-icons';

import { SprintDataContext } from '@utils/ctx/SprintDataContext';
import { completedStoryPoints } from '@utils/sprintMetrics';

const SavePresentation = () => {
  const { setVisible, bindings } = useModal();
  const { user, tasks, currentSprint } = useContext(SprintDataContext);

  const savePresentation = async () => {
    const achievement = completedStoryPoints(
      tasks.stories,
      tasks.bugs,
      tasks.others,
    );

    const [saved, savedError] = await fetch(
      `/api/sprints/${currentSprint.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          sprint: { data: { tasks, user }, achievement },
        }),
      },
    );
  };

  return (
    <>
      <Button
        style={{
          zIndex: 100,
          position: 'absolute',
          right: '20px',
          bottom: '20px',
        }}
        auto
        onClick={() => setVisible(true)}
        iconRight={<Save />}
      >
        Save
      </Button>
      <Modal {...bindings}>
        <Modal.Title>Do you really want to save the presentation?</Modal.Title>
        <Modal.Content>
          If you want to save the presentation as is you will be saved as its
          presenter and you won&apos;t be able to change it anymore.
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action onClick={() => savePresentation()}>Submit</Modal.Action>
      </Modal>
    </>
  );
};

export default SavePresentation;
