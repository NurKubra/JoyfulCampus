import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { swalAlert } from "../../../helpers/swal";
import {
  getAllLessonProgramByStudent,
  getAllLessonPrograms,
} from "../../../api/lesson-program-service";
import { chooseLesson } from "../../../api/student-service";
import { refreshToken } from "../../../store/slices/misc-slice";

const AllProgramList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const { listRefreshToken } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      const dataAll = await getAllLessonPrograms();
      const dataSelected = await getAllLessonProgramByStudent();

      const arr = dataAll.filter( //dataAll u filtreleyerek 
        (item1) =>
          !dataSelected.some( //some fonsiyonu bir dizi icinde bir tane o eleman varsa true verir ama ben olmayanlari istiyorum 
            (item2) => item1.lessonProgramId === item2.lessonProgramId
          )
      );
      //burda tum listedeki derslerin ogrencinin ders secmis oldugu listede olup olmadigina bakiyoruz --> some eger bi taen bulursa true doner ama biz secilememis olanlari listede gormek yani filtrelemek istiyoruz o yuzden false olanlalari aldik 

      setList(arr);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getLessonNames = (row) => {
    return row.lessonName.map((item) => item.lessonName).join("-");
  };

  const getTeacherNames = (row) => {
    return row.teachers.map((item) => `${item.name} ${item.surname}`).join("-"); 
  };

  const handleSelect = async () => {
    setLoading(true);

    try {
      if (selectedPrograms.length <= 0) //selctedPrograms bossa hata gonder
        throw new Error("Select at leaest a program", "success");

      const payload = {
        lessonProgramId: selectedPrograms.map((item) => item.lessonProgramId), //endpointimiz payload iicnde sadece lessonProgramId leri iceren bir list istiyor ama selectedProgram tüm bilgileri cieriyor bu yuzden icindeki sadece idleri aldik 
      };

      await chooseLesson(payload);
      dispatch(refreshToken());

      swalAlert("Program was choosen");
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.msg; 
      swalAlert(errMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [listRefreshToken]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title className="d-flex justify-content-between align-items-center">
            <span>All Lesson Programs</span>
          </Card.Title>

          <DataTable
            value={list}
            dataKey="lessonProgramId"
            selection={selectedPrograms} //selectionMode a baglamis olduk ; birden fazla kutucuk secilebilir //yani secilmis olanlari saklayan state
            onSelectionChange={(e) => setSelectedPrograms(e.value)} //ben bir seyi secip tikladigim zaman(butun satiri) selectedProgram icine atcak (secmede bi degisiklik oldugunda (selectionChange))
            loading={loading}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column selectionMode="multiple" />
            <Column body={getLessonNames} header="Lessons" />
            <Column body={getTeacherNames} header="Lessons" />
            <Column field="day" header="Day" />
            <Column field="startTime" header="Start" />
            <Column field="stopTime" header="End" />
          </DataTable>

          <div className="text-center mt-3">
            <Button variant="primary" size="lg" onClick={handleSelect}>
              SELECT
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AllProgramList;