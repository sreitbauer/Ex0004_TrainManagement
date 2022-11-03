package at.htlkaindorf.ex0004.database;

import at.htlkaindorf.ex0004.pojo.Train;
import jakarta.ws.rs.NotFoundException;

import javax.management.openmbean.KeyAlreadyExistsException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TrainDatabase {
    private static TrainDatabase instance;
    private List<Train> trains = new ArrayList<>();

    public synchronized static TrainDatabase getInstance() {
        if (instance == null) {
            instance = new TrainDatabase();
        }
        return instance;
    }

    public void addStation(int id, String station) {
        if (!exists(id))
            throw new NotFoundException("Id not found");
        getById(id).addStation(station);
    }

    public List<Train> getTrains() { return trains; }

    public void addTrain(Train train) {
        if (exists(train.getId()))
            throw new KeyAlreadyExistsException("Conflict");
        trains.add(train);
    }

    public Train getById(int id) {
        return trains.stream().filter(train -> train.getId() == id).findFirst().orElse(null);
    }

    private boolean exists(int id) {
        return trains.stream().filter(train -> train.getId() == id).findFirst().isPresent();
    }

    private TrainDatabase() {
        trains.add(new Train(0, new ArrayList<>(Arrays.asList("Kaindorf", "Lebring", "Wildon", "Werndorf", "Feldkirchen", "Don Bosco", "Graz")), "S-Bahn"));
        trains.add(new Train(1, new ArrayList<>(Arrays.asList("Kaindorf", "Don Bosco", "Graz")), "REX"));
        trains.add(new Train(2, new ArrayList<>(Arrays.asList("Leibnitz", "Graz")), "Intercity"));
    }
}
